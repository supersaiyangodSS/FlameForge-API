import { Document } from "mongoose";

export interface IReport extends Document {
    name: string,
    email: string,
    url: string,
    message: string,
    createdAt: Date
}