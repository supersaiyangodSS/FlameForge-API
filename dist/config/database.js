import { config } from 'dotenv';
config();
import { connect } from 'mongoose';
const mongoUri = process.env.DB_URL || 'mongodb://127.0.0.1:27017/API'; // TODO: Remove Later
const connectDB = async () => {
    try {
        await connect(mongoUri);
        console.log('connected to mongoose');
    }
    catch (error) {
        console.log('connection failed', error);
    }
};
export default connectDB;
//# sourceMappingURL=database.js.map