import * as express from 'express';
const app = express();
import * as bodyParser from'body-parser';

import DBConnector from './db-connector';
import Config from '../config';
import Router from "../route";
import Utils from "../utils";

const Logger = Utils.Logger;


const connectDatabases = async () => {
  await DBConnector.connectMongo(Config.MONGO_CACHE_DB_URL);
};

const addBodyParser = async () => {
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());
};

const listenPort = (PORT) => {
  app.listen( PORT, () =>
    Logger.info(`Server running on http://localhost:${PORT}`)
  );
};

const start = async () => {
  await connectDatabases();
  await addBodyParser();
  await Router.initRoutes(app);
  await listenPort(Config.SERVICE_PORT);
};

export default {
  start
}

