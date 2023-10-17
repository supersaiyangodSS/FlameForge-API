import User from '../models/userModel.js';

const getDashboard = async (req: Request, res: Response) => {
    
    try {
        const users = await User.find().select(
            '-password -token -__v -_id -isTokenUsed -email -createdAt -updatedAt'
        ).lean();
        const locals = {
            title: 'Dashboard',
            desc: 'Dashboard for FlameForge API',
            users: users
        }
        res.render('dashboard', locals);
        console.log(users);
        
    } catch (error) {
        console.log(error);
        
    }
}

import { Request, Response } from "express";

export { getDashboard };
