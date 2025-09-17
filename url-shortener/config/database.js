import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
        console.log('Connected to mongoDB');
    } catch (error) {
        console.error('Unable to connect to mongoDB', error.message);
        process.exit(1);
    }
};

export default connectDB;