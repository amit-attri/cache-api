import { MongoMemoryServer } from "mongodb-memory-server";
import * as mongoose from "mongoose";

let mongod;
async function createMockDb() {
  mongod = new MongoMemoryServer();
  const mongoDbUri = await mongod.getConnectionString();
  await mongoose.connect(mongoDbUri, { useNewUrlParser: true })
  console.log('db setup done');
}

async function teardownDb() {
  await mongoose.disconnect();
  await mongod.stop();
}

async function clearDb() {
  await mongoose.connection.db.dropDatabase();
}

export const setupStuff = async () => {
  await createMockDb();
};

export const teardownStuff = async () => {
  await teardownDb();
}

export const clearStuff = async() => {
  await clearDb();
}
