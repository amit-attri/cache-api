const SERVICE_PORT: number = parseInt(process.env.SERVICE_PORT) || 8000;
const MONGO_CACHE_DB_URL = process.env.MONGO_CACHE_DB_URL || 'mongodb://localhost/cache';

export default {
  SERVICE_PORT,
  MONGO_CACHE_DB_URL
}