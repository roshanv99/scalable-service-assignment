import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

const connectDB = async () => {
  try {
    if(process.env.MONGODB_URL) {
      console.log("++>, ", process.env.MONGODB_URL)
      mongoose.connect(process.env.MONGODB_URL).then(() => {
        console.log("Connect To Mongo DB Server");
        console.log('MongoDB connected');
    }).catch((err) => {
        console.error("Failed to connected to MondoDB: ",err);
    });
    } 
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

export default connectDB;