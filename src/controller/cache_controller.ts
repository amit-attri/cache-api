import Utils from '../utils';
import { Response, Request } from "express";
import {CacheService} from "../service";

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

export default {
  getValueByKey,
  getAllCacheItems
}