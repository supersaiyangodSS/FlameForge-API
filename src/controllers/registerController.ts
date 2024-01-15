import { Request, Response } from "express";
import User from '../models/userModel.js';
import { validationResult } from 'express-validator';
import { hash } from 'bcrypt';
import sendEmail from "../helpers/mailer.js";
import { randomBytes } from 'crypto';
import Setting from "../models/settingsModel.js";
import { logger } from "../helpers/logger.js";

const saltRounds : number = 10;

const generateToken = () => {
    return randomBytes(20).toString('hex');
}

const registerPage = async (req: Request, res: Response) => {
    try {
        let allSett = await Setting.findOne({ settingType: 'global' });
        if (!allSett) {
            logger.error(`Error fetching settings!`);
            return res.status(500).render('500', {
                title: "Internal Server Error!",
            });
        }
        if (allSett.registerRoute == false) {
            return res.status(401).render('401', {
                title: "Unauthorized",
            });
        }
        logger.silly(`${req.ip} requested Registration Page`)
        return res.status(200).render('register', {
            title: "FlameForgeAPI Sign Up",
            messages: req.flash()
        });
    } catch (error) {
            logger.error(`Error occured on register page: ${error}`);
            console.log(error);
            res.status(500).render('500', {
                title: "Internal Server Error!",
            });
    }
}

const addUser = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    const { firstName, lastName, email, username, password } = req.body;
    const verificationToken : string = generateToken();
    const verificationLink : string = `https://5f75-45-115-89-2.ngrok-free.app/sign-up/verify?token=${verificationToken}`;
    if (!errors.isEmpty()) {
        const errorOne = errors.array()[0].msg;
            req.flash('error', errorOne);
            return res.status(301).redirect(`/sign-up`);
    }
    try {
        const user = await User.findOne({ $or: [{email}, {username}] });
        if (user) {
            if (user.email === email) {
                req.flash('error', 'Email Already Exists!');
                return res.status(301).redirect('/sign-up');
            }
            if (user.username === username) {
                req.flash('error', 'Username Already Exists!');
                return res.status(301).redirect('/sign-up');
            }
        }
        try {
            const subject : string = 'Email Verification';
            const mailBody : string = `
                <p>Thank you ${username} for signing up. Please click the link below to verify your email address:</p>
                <a href="${verificationLink}">Verify Email</a>
                <p>If you didn't sign up for this service, you can safely ignore this email.</p>
                <p>Best regards,<br>Vedant</p>`
            await sendEmail(email, subject, mailBody);
        }
        catch (error) {
            logger.error(`Error occured while sending the verification email: ${error}`);
            console.log(error);
            res.status(500).render('500', {
                title: "Internal Server Error!",
            });
        }
        const hashedPassword : string = await hash(password, saltRounds);
        const newUser = new User({
            firstName,
            lastName,
            email,
            username,
            password: hashedPassword,
            token: verificationToken,
        });
        await newUser.save();
        return res.status(200).render('emailSent', {
            title: "Email Sent Successfully!",
            email,
        })
    }
    catch (error) {
        res.status(500).render('500', {
            title: "Internal Server Error!",
        });
    }
}

const verifyUser = async (req: Request, res: Response) => {
    const { token } = req.query;
    try {
        const user = await User.findOne({
            token,
            isTokenUsed: false,
        });
        if (!user) {
            return res.status(404).render('404', {
                title: "Not Found!",
            });
        }
        user.verified = true,
        user.isTokenUsed = true,
        user.token = generateToken();
        await user.save();
        return res.status(200).render('emailVerified', {
            email: user.email
        }); 
    }
    catch (error) {
        logger.error(`User: ${req.session.user}, Error occured while varifying the user!`);
        console.log(error);
        res.status(500).render('500', {
            title: "Internal Server Error!",
        });
    }
}

export { registerPage, addUser, verifyUser }