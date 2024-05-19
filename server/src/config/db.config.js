import mongoose from 'mongoose';

export const connectToDB = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URI);
    console.log('connected To DB');
  } catch (error) {
    console.log(error);
  }
};
