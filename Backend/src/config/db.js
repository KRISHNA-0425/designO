import mongoose from 'mongoose'

const uri = process.env.MONGO_URI

const connectDb = async () => {
    try {
        await mongoose.connect(uri);
    } catch (error) {
        console.log(error)
    }
}

export default connectDb