import mongoose from 'mongoose';

let isConnected = false; // track the connection

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if (isConnected) {
    console.log('MongoDB is already connected');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'share_prompt',
      useNewUrlParser: false, // false useNewUrlParser as it is deprecated
      useUnifiedTopology: false, // false useUnifiedTopology as it is deprecated
      // serverSelectionTimeoutMS: 5000, // Add serverSelectionTimeoutMS to avoid the timeout issue
    });

    isConnected = true;

    console.log('MongoDB connected');
  } catch (error) {
    console.log(error);
  }
};
