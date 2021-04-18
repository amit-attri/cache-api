import {setupStuff, clearStuff, teardownStuff} from "../mockers/init";
import {CacheService} from "../../../src/service";
import Config from "../../../src/config";

beforeAll(async () => {
  await setupStuff();
});

afterEach(async () => {
  await clearStuff();
  jest.clearAllMocks();
});

afterAll(async () => {
  await teardownStuff();
})

describe("get cache item", () => {
  it('get cache item should return same value for a key', async () => {
    
    const cacheItem1 = await CacheService.getCacheItemByKey("key1", "value expireAt");
    const cacheItem2 = await CacheService.getCacheItemByKey("key1", "value expireAt");
    
    expect(cacheItem1.value).toBeDefined();
    expect(cacheItem2.value).toBeDefined();
  
    expect(cacheItem1.value).toEqual(cacheItem2.value)
  });
})

describe("get cache item when cache is full", () => {
  it('get cache item when cache is full', async () => {
    const maxCacheSize = Config.MAX_CACHE_SIZE;
    for(let i=0; i < maxCacheSize; i++){
      await CacheService.getCacheItemByKey(`key_${i}`, "value expireAt");
    }
    const cacheItem = await CacheService.getCacheItemByKey(`key_${maxCacheSize}`, "value expireAt");
    
    expect(cacheItem.value).toBeDefined();
    const cacheItems = await CacheService.getAllCacheItems('key value');
    cacheItems.forEach(item => {
      expect(item.key).not.toEqual('key_0')
    });
  });
})