const SERVICE_PORT: number = parseInt(process.env.SERVICE_PORT) || 8000;
const MONGO_CACHE_DB_URL = process.env.MONGO_CACHE_DB_URL || 'mongodb+srv://mongo_dev_rw:ZoMW8CBFbSbKu3ii@mongocluster1.npeai.mongodb.net/cache?retryWrites=true&w=majority;'

export default {
  SERVICE_PORT,
  MONGO_CACHE_DB_URL
}