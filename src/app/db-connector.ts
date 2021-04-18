import * as mongoose from'mongoose';

const connectMongo = async (mongoUrl) => {
  try {
    await mongoose.connect(mongoUrl, {useNewUrlParser: true});
    console.log('Database Connected');
  }
  catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default {
  connectMongo
};