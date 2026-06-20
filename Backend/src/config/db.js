import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();
const uri = process.env.MONGO_URI

const connectDb = async () => {
    try {
        await mongoose.connect(uri);
    } catch (error) {
        console.log("unable to connect to db", error)
    }
}

export default connectDb;