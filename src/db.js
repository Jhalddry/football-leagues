import mongoose from 'mongoose';
import { config } from 'dotenv';

config()

const connectDB = async() => {
    const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.8orz9yd.mongodb.net/?retryWrites=true&w=majority`
    try {
        await mongoose.connect(uri)
        console.log('Database connected')
    } catch (error) {
        console.log(error)
    }
}

export default connectDB;