import {setupStuff, clearStuff, teardownStuff} from "../mockers/init";
import {CacheService} from "../../../src/service";

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