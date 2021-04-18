const SERVICE_PORT: number = parseInt(process.env.SERVICE_PORT) || 8000;
const MONGO_CACHE_DB_URL = process.env.MONGO_CACHE_DB_URL;
const MAX_CACHE_SIZE: number = parseInt(process.env.MAX_CACHE_SIZE) || 5;
const CACHE_TTL: number = parseInt(process.env.CACHE_TTL) || 1;

export default {
  SERVICE_PORT,
  MONGO_CACHE_DB_URL,
  MAX_CACHE_SIZE,
  CACHE_TTL
}