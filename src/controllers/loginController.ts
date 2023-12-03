import { Request, Response } from "express";
import User from '../models/userModel.js';
import { validationResult } from 'express-validator';
import { logger } from "../helpers/logger.js";

const loginPage = (req: Request, res: Response) => {
    res.render('login', {
        title: 'FlameForgeAPI Login',
        messages: req.flash(),
    }); 
}

const loginUser = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    const { email, password } = req.body;
    console.log(`${email} and ${password}`)
    console.log(req.body)
    if (!errors.isEmpty()) {
        const errorOne = errors.array()[0].msg;
        req.flash('error', errorOne);
        return res.status(301).redirect(`/sign-in`);
    }
    try {
        const user = await User.findOne({email})
        if (!user) {
            req.flash('error', 'User does not exist!');
            return res.status(301).redirect('/sign-in');
        }
        if (password === user.password) {
            req.flash('error', 'Wrong Username or Password!');
            return res.status(301).redirect('/sign-in');
        }
        if (user.verified === false) {
            return res.status(301).redirect('/verify');
        }
        req.session.user = user.username;
        req.session.role = user.role;
        req.session.uid = user._id;
        return res.status(200).redirect('/dashboard');
    }
    catch (error) {
        logger.error(`User: ${req.session.user}, Error occured while logging in: ${error}`);
        console.log(error);
        res.status(500).render('500', {
            title: "Internal Server Error!",
        });
    }
}

export { loginPage , loginUser };