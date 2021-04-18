import * as express from 'express';
const router = express.Router();
import {CacheController} from "../controller";

router.get('/:key', CacheController.getValueByKey);
router.get('/', CacheController.getAllCacheItems);

export default router;