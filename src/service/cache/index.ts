import CacheDao from './dao';
import * as moment from 'moment';
import Utils from '../../utils';
import Config from '../../config';
import {CacheItem} from "./interfaces";
import { Response, Request } from "express";

const Logger = Utils.Logger;

const isCacheItemExpired = (cacheItem : CacheItem) => {
  return Utils.getCurrentUtcTime() > moment(cacheItem.expireAt).utc()
};

const handleCacheMiss = async (key: string) : Promise<CacheItem> => {
  Logger.info("Cache Miss");
  return await createCacheItemWithRandomValue(key);
};

const handleCacheExpiry = async (cacheItem : CacheItem, key: string) : Promise<CacheItem>=> {
  await CacheDao.deleteById(cacheItem._id);
  return await createCacheItemWithRandomValue(key);
};

const handleCacheHit = async (cacheItem: CacheItem) : Promise<CacheItem> => {
  Logger.info("Cache hit");
  await CacheDao.updateById(cacheItem._id, moment().utc());
  return cacheItem;
};

const getItemToDelete = async () : Promise<CacheItem | undefined> => {
  const expiredItem = await CacheDao.getExpiredItem();
  // First check if there is any expired item in DB. If found, delete it. Although ttl property of mongo db is being used
  // But as it runs evey 60 seconds (might get delay further) so we can't rely solely on mongo db
  //hence check explicitly for expired items
  if(expiredItem)
    return expiredItem;
  // If there is no expired item, then check which is not used recently. We have kept a lastReadAt field to check that, key which has least lastReadAt, would be deleted
  // SO basically, we are deleting the key which is least recently used.
  const leastRecentlyUsedCacheItem = await CacheDao.findLeastRecentlyUsedKey();
  if(leastRecentlyUsedCacheItem)
    return leastRecentlyUsedCacheItem;
  return undefined;
};

const handleCacheOverflow = async () : Promise<void>=> {
  const itemToDelete = await getItemToDelete();
  if(!itemToDelete)
    return;
  await CacheDao.deleteById(itemToDelete._id);
  return;
};

const checkIsCacheFull = async () : Promise<boolean> => {
  const entriesCount = await CacheDao.getDocumentsCount();
  return entriesCount >= Config.MAX_CACHE_SIZE;
};

const getExpiredAtByTTL = (ttl: number) : moment.Moment=> {
  return Utils.getCurrentUtcTime().add(ttl, 'minutes');
};

const createCacheItemWithRandomValue = async (key: string) => {
  const isCacheFull = await checkIsCacheFull();
  if (isCacheFull) {
    await handleCacheOverflow();
  }
  const randomValue = Utils.getRandomString();
  const expireAt = getExpiredAtByTTL(Config.CACHE_TTL);
  return await CacheDao.save(key, randomValue, expireAt);
};

const getCacheItemByKey = async (key: string, requiredFields: string) : Promise<CacheItem> => {
  let cacheItem = await CacheDao.getByKey(key, requiredFields);
  if (!cacheItem) {
    return handleCacheMiss(key);
  }
  
  if (isCacheItemExpired(cacheItem)) {
    return handleCacheExpiry(cacheItem, key);
  }
  
  return handleCacheHit(cacheItem);
};

const getAllCacheItems = async () : Promise<CacheItem[]> => {
  return await CacheDao.getAll();
};

export default {
  getCacheItemByKey,
  getAllCacheItems
}