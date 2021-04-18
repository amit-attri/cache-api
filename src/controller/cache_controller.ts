import Utils from '../utils';
import { Response, Request } from "express";
import {CacheService} from "../service";
import Exception from "../exception";

const Logger = Utils.Logger;

const getValueByKey = async (req : Request, res: Response) => {
  try {
    const key = req.params.key;
    
    const cacheItem = await CacheService.getCacheItemByKey(key, 'value expireAt');
    Utils.sendSuccessResponse(res, { value: cacheItem.value});
  }
  catch (error) {
    Logger.error(error);
    Utils.handleErrorResponse(res, error);
  }
};

const getAllCacheItems = async (req : Request, res: Response) => {
  try {
    const cacheItems = await CacheService.getAllCacheItems();
    Utils.sendSuccessResponse(res, cacheItems);
  } catch(error) {
    Logger.error(error);
    Utils.handleErrorResponse(res, error);
  }
}

const updateCacheValueByKey = async (req : Request, res: Response) => {
  try {
    const key = req.params.key;
    if(!key)
      throw Exception.INVALID_KEY();
    const value = req.body.value;
    if(!value)
      throw Exception.INVALID_VALUE();
    const updatedCacheItem = await CacheService.updateCacheValueByKey(key, value);
    Utils.sendSuccessResponse(res, updatedCacheItem);
  } catch (error) {
    Logger.error(error);
    Utils.handleErrorResponse(res, error);
  }
}

export default {
  getValueByKey,
  getAllCacheItems,
  updateCacheValueByKey
}