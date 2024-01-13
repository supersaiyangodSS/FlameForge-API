import { Schema, model } from 'mongoose';
const settingSchema = new Schema({
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
//# sourceMappingURL=settingsModel.js.map