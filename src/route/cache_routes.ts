import * as express from 'express';
const router = express.Router();
import {CacheController} from "../controller";

router.get('/:key', CacheController.getValueByKey);
router.get('/', CacheController.getAllCacheItems);

router.put('/:key', CacheController.updateCacheValueByKey);

router.delete('/:key', CacheController.deleteCacheItem);
router.delete('/', CacheController.deleteAllCacheItems);

export default router;