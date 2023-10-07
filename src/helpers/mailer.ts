import { createTransport } from 'nodemailer';


const transporter = createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SERVER_EMAIL,
        pass: process.env.SERVER_EMAIL_SECRET
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

export default sendEmail;