import mongoose from "mongoose";

async function connectDB() {
    try {
       await mongoose.connect(process.env.MONGODB_STRING)
       console.log('Connected to mongoDB')
    } catch (error) {
        console.error('Unable to connect mongoDB')
    }
}

export default connectDB