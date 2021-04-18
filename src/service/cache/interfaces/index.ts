export interface CacheItem {
  _id?: string,
  key?: string,
  value?: string,
  expireAt?: Date,
  lastHitAt?: Date
}