import { config } from 'dotenv';
config();
import { connect } from 'mongoose';

const mongoUri : string = process.env.DB_URL || 'mongodb://1270.0.0.1/27017';

const connectDB = async () => {
    try {
        await connect(mongoUri);
        console.log('connected to mongoose');
    }
    catch (error) {
        console.log('connection failed', error);
    }
}

export default connectDB;
