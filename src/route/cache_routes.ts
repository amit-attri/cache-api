import * as express from 'express';
const router = express.Router();
import {CacheController} from "../controller";

router.get('/:key', CacheController.getValueByKey);
router.get('/', CacheController.getAllCacheItems);

router.put('/:key', CacheController.updateCacheValueByKey);

export default router;