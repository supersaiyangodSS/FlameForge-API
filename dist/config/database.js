import { config } from 'dotenv';
config();
import { connect } from 'mongoose';
const mongoUri = process.env.DB || '';
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