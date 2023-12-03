import { Document } from "mongoose";

export interface ISettings extends Document {
    registerRoute: boolean,
    settingType: string,
    updatedAt: Date,
}
