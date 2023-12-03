import { Schema, model } from 'mongoose';
import { ISettings } from '../interfaces/settingsInterface';

const settingSchema = new Schema<ISettings>({
    registerRoute: {
        type: Boolean,
        default: false
    },
    settingType: {
        type: String,
        default: "none"
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Setting = model("Setting", settingSchema);

export default Setting;
