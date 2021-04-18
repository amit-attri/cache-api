import CacheRoutes from './cache_routes';

const initRoutes = (app) => {
  app.use('/cache', CacheRoutes);
}

export default {
  initRoutes
}