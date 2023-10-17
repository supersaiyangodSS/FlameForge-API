import { Schema, model } from "mongoose";
import { IUser } from '../interfaces/userInterface';

const userSchema = new Schema<IUser>({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["admin", "moderator", "user"],
        default: "user"
    },
    verified: {
        type: Boolean,
        default: false,
    },
    token: {
        type: String,
        required: true,
    },
    isTokenUsed: {
        type: Boolean,
        default: false,
    },
    profilePic: {
        type: String,
        default: 'xiao'
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});

const User = model("User", userSchema);

export default User;
