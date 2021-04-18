import Utils from '../utils';
import { Response, Request } from "express";
import {CacheService} from "../service";

const Logger = Utils.Logger;

const getValueByKey = async (req : Request, res: Response) => {
  try {
    const key = req.params.key;
    
    const cacheItem = await CacheService.getCacheItemByKey(key, 'value expireAt');
    Utils.sendSuccessResponse(res, cacheItem);
  }
  catch (error) {
    Logger.error(error);
    Utils.handleErrorResponse(res, error);
  }
};

export default {
  getValueByKey
}