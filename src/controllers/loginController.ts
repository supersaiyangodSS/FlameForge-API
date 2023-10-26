import { Request, Response } from "express";
import User from '../models/userModel.js';
import { validationResult } from 'express-validator';

const loginPage = (req: Request, res: Response) => {
    res.render('login');
}

const loginUser = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    const { username, password } = req.body;
    console.log(`${username} and ${password}`)
    console.log(req.body)
    if (!errors.isEmpty()) {
        console.log('validation error')
        return res.status(409).json({
            errors: errors.array().map((key) => key.msg)
        });
    }
    try {
        const user = await User.findOne({username})
        if (!user) {
            return res.status(404).json({
                notFound: `${username} does not exits`
            });
        }
        if (password === user.password) {
            return res.status(401).json({
                unauthorized: 'wrong username or password'
            });
        }
        if (user.verified === false) {
            return res.status(302).redirect('/verify');
        }
        req.session.user = user.username;
        req.session.role = user.role;
        console.log('session ${user.username}') //TODO: Remove Later
        console.log(`session is `, req.session.user);
        return res.status(200).redirect('/dashboard');
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'internal server error'
        });
    }
}

export { loginPage , loginUser };