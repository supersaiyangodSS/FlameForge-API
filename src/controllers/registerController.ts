import { Request, Response } from "express";
import User from '../models/userModel.js';
import { validationResult } from 'express-validator';
import { hash, compare } from 'bcrypt';
import { createTransport } from 'nodemailer';
import { randomBytes } from 'crypto'

const saltRounds : number = 10;

const generateToken = () => {
    return randomBytes(20).toString('hex');
}

const transporter = createTransport({
    service: 'gmail',
    auth: {
        user: 'vedantsapalkar99@gmail.com', // TODO: use process.env.SERVER_EMAIL
        pass: 'kprx vfgn vapl kgjb' // TODO: use process.env.SERVER_EMAIL_SECRET
    }
});

async function sendEmail(email: string, subject: string, mailBody: string) {
    const mailOptions = {
        from: 'vedantsapalkar99@gmail.com',
        to: email,
        subject,
        html: mailBody
    }
    try {
        await transporter.sendMail(mailOptions);
        console.log('email sent successfully!');
    }
    catch (error) {
        console.error('error sending email', error)
    }
}

const addUser = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    const { firstName, lastName, email, password } = req.body;
    const verificationToken : string = generateToken();
    const verificationLink : string = `http://localhost:4000/sign-up/verify?token=${verificationToken}`;
    if (!errors.isEmpty()) {
        return res.status(409).json({
            errors: errors.array().map((key) => key.msg)
        })
    }
    try {
        const user = await User.findOne({email})
        if (user) {
            return res.status(200).json({
                conflict: `${email} already exists!`
            })
        }
        try {
            const subject : string = 'Email Verification';
            const mailBody : string = `
                <p>Thank you for signing up. Please click the link below to verify your email address:</p>
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

export { addUser }