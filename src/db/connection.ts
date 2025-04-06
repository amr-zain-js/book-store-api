import mongoose from 'mongoose';

const connectDB = (url) => {
    try {
        return mongoose.connect(url);
    } catch (e) {
        console.error("DB connection error: ", e)
    }
};

export default connectDB;
