import mongoose from "mongoose";

async function connectDB() {
    try {
        mongoose.connection.on('connected', () => {
            console.log('Connected to mongoDB');
        });

        mongoose.connection.on('error', (error) => {
            console.error(`Error in mongodb connection`, error);
        });
        await mongoose.connect(process.env.MONGODB_STRING);
        // console.log('connected to mongodb');
    } catch (error) {
        console.error('Failed to connect mongodb');
        process.exit(1);
    }
}

export default connectDB;