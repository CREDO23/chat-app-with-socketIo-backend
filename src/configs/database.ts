import * as mongoose from 'mongoose';

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

export default connectDB;
