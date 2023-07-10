import mongoose from "mongoose";
import config from "config";


const connectDB = async () => {
try {
    const url = config.get('db.url');
    await mongoose.connect(url, { useNewUrlParser: true , useUnifiedTopology: true });
    console.log('--DB Connected--')
} catch (error) {
    console.log('Failed to connect DB-', error);
}
}

export default connectDB;


