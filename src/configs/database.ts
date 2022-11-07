import * as mongoose from 'mongoose';
import MongoStore = require('connect-mongo');

const connectDB = async (URI: string): Promise<void> => {
  try {
    await mongoose
      .connect(URI)
      .then(() => {
        console.log('Connection to database established');
      })
      .catch((error) => console.log(error));
  } catch (error) {
    console.log(error);
  }
};

export const connectMongostore = (URI: string) => {
  return MongoStore.create({
    mongoUrl: URI,
    collectionName: 'sessions',
    ttl: 60 * 60 * 24 * 1000,
    autoRemove: 'native',
  });
};

export default connectDB;
