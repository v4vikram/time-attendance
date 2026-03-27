import nodemailer from "nodemailer";
import { config } from "../config/env.js";

export const sendEmail = async ({ to, subject, html }) => {
    const transporter = nodemailer.createTransport({
        host: config.emailHost,
        port: config.emailPort,
        secure: false,
        auth: {
            user: config.emailUser,
            pass: config.emailPass,
        },
    });

    const mailOptions = {
        from: `"Your App" <${config.emailUser}>`,
        to,
        subject,
        html,
    };

    await transporter.sendMail(mailOptions);
};