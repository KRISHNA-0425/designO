import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();

const uri = process.env.MONGO_URI

const connectDb = async () => {
    try {
        // 🔒 Stop mongoose from quietly buffering commands when disconnected
        mongoose.set('bufferCommands', false);

        // ⚡ Injected options to stabilize connection over network drops
        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 5000, // Drop and fail quickly instead of waiting 10s
        });
    } catch (error) {
        console.error("Mongoose Connection Handshake Failed!");
        // THE FIX: Throw the error so the main server block knows it failed!
        throw error; 
    }
}

export default connectDb;