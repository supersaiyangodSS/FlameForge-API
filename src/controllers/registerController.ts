import { Request, Response } from "express";
import User from '../models/userModel.js';
import { validationResult } from 'express-validator';
import { hash } from 'bcrypt';
import sendEmail from "../helpers/mailer.js";
import { randomBytes } from 'crypto';

const saltRounds : number = 10;

const generateToken = () => {
    return randomBytes(20).toString('hex');
}

const registerPage = async (req: Request, res: Response) => {
    res.render('register', {
        title: 'FlameForgeAPI Sign Up'
    })
}

const addUser = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    const { firstName, lastName, email, username, password } = req.body;
    const verificationToken : string = generateToken();
    const verificationLink : string = `http://localhost:4000/sign-up/verify?token=${verificationToken}`;
    if (!errors.isEmpty()) {
        return res.status(409).json({
            errors: errors.array().map((key) => key.msg)
        })
    }
    try {
        const user = await User.findOne({ $or: [{email}, {username}] });
        if (user) {
            if (user.email === email) {
                return res.status(409).json({
                    conflict: `${email} already exists`
                })
            }
            if (user.username === username) {
                return res.status(409).json({
                    conflict: `${username} already exists`
                })
            }
            return res.status(200).json({
                conflict: `${email} already exists!`
            })
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
            console.error(error);
            return res.status(500).json({
                error: 'Failed to send mail, try again later'
            })
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
        res.status(200).json({
            newUser: `User created successfully: ${firstName} ${lastName} ${email}`
        });
    }
    catch (e) {
        res.status(500).json({
            error: "Internal Server Error"
        });
        console.error(e);
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
           return res.status(404).json({
               error: 'Invalid or Expired Token'
           });
        }
        user.verified = true,
            user.isTokenUsed = true,
            user.token = generateToken();
        await user.save();
        return res.status(200).json({
            message: 'User verified successfully'
        });
    }
    catch (error) {
        console.error(error);
    }
}

export { registerPage, addUser, verifyUser }