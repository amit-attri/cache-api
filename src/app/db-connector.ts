import * as mongoose from'mongoose';
import Utils from "../utils";

const Logger = Utils.Logger;

const connectMongo = async (mongoUrl) => {
  try {
    await mongoose.connect(mongoUrl, {useNewUrlParser: true});
    Logger.info('Database Connected');
  }
  catch (error) {
    Logger.error(error);
    process.exit(1);
  }
};

export default {
  connectMongo
};