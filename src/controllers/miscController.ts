import { Request, Response } from "express";
import Report from '../models/reportModel.js';
import { logger } from '../helpers/logger.js';
import { validationResult } from "express-validator";
import sendEmail from "../helpers/mailer.js";

const reportPage = (req: Request, res: Response) => {
    res.render('report', {
        title: 'Report',
        messages: req.flash()
    })
}

const sendReport = async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        const { name, email, errorUrl, message } = req.body;
        if(!errors.isEmpty()) {
            const errorOne = errors.array()[0].msg;
            req.flash('error', errorOne);
            return res.status(301).redirect('/misc/report')
        }
        const newReport = new Report({
            name,
            email,
            url: errorUrl,
            message,
            createdAt: Date.now()
        })
        try {
            const myEmail = 'vedantsapalkar99@gmail.com';
            const mailTitle = `Reported: ${errorUrl}`;
            const mailBody =  `
            <p>Error Url: <a href="${errorUrl}">${errorUrl}</a></p>
            <p>Error Info: ${message}</p>
            `
            await sendEmail(myEmail, mailTitle, mailBody);
        } catch (error) {
            logger.error(`Error occured while sending email report: ${error}`);
            console.log(error);
            return res.status(500).render('500', {
                title: "Internal Server Error!",
            });
        }
        await newReport.save();
        req.flash('success', 'Report Sent Successfully');
        return res.status(301).redirect('/misc/report')
    } catch (error) {
        logger.error(`Error occured while submitting report: ${error}`);
        console.log(error);
        res.status(500).render('500', {
            title: "Internal Server Error!",
        });
    }
}

export { reportPage, sendReport };