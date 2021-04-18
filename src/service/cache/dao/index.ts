import * as moment from 'moment';
import * as _ from 'lodash';

import CacheModel from './cache_model';
import Util from '../../../utils';
import {CacheItem} from "../interfaces";

const getByKey = async (key, requiredFields: string) : Promise<CacheItem> => {
  return await CacheModel.findOne({key}, requiredFields);
};


const getDocumentsCount = async () : Promise<Number> => {
  return await CacheModel.countDocuments();
}

const getAll = async () : Promise<CacheItem[]> => {
  return await CacheModel.find().lean();
};

const findLeastRecentlyUsedKey = async () : Promise<CacheItem> => {
  const leastRecentlyUsedItem = await CacheModel.find().sort({"lastReadAt": 1}).limit(1);
  return _.get(leastRecentlyUsedItem, '0', undefined);
};

const getExpiredItem = async () : Promise<CacheItem> => {
  const currentTime = Util.getCurrentUtcTime();
  return await CacheModel.findOne({expireAt: {'$lte': currentTime}});
}

const save = async (key: string, value: string, expireAt: moment.Moment) => {
  const lastReadAt = moment.utc();
  const item = new CacheModel({key, value, expireAt, lastReadAt});
  return await item.save();
};

const deleteById = async (id: string) => {
  return await CacheModel.deleteOne({_id: id});
};

const deleteByKey = async (key: string) => {
  return await CacheModel.deleteOne({key});
};

const deleteAll = async () => {
  return await CacheModel.deleteMany({});
};

const updateById = (id: string, lastReadAt: moment.Moment) => {
  const updateQuery = { lastReadAt };
  return CacheModel.findByIdAndUpdate({ _id: id}, updateQuery, {new: true});
};

const updateByKey = async (key: string, value: string) : Promise<CacheItem> => {
  const lastReadAt = moment().utc();
  const updateQuery = {key, value, lastReadAt};
  return await CacheModel.findOneAndUpdate({key}, updateQuery, {new: true});
};

export default {
  getByKey,
  getDocumentsCount,
  getAll,
  findLeastRecentlyUsedKey,
  save,
  deleteById,
  deleteByKey,
  updateById,
  updateByKey,
  deleteAll,
  getExpiredItem
}