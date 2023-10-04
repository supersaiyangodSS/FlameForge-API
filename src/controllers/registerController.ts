import { Request, Response } from "express";
import User from '../models/userModel.js';

export const addUser = async (req: Request, res: Response) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        const user = await User.findOne({email})
        if (user) {
            return res.status(200).json({
                conflict: `${email} already exists!`
            })
        }
    }
    catch (e) {
        res.status(500).json({
            error: "Internal Server Error"
        });
        console.error(e);
    }
}