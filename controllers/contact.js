import Contact from "../models/contact.js";
import express from "express";
import { transporter } from "../utills/email.js";

const router = express.Router();

export const sendContactUsEmail = async (req, res) => {
  const { firstName, lastName, email, message } = req.body;

  try {
    const mailConfigurations = {
      from: email,
      to: 'floyd.fernandes.dev@gmail.com',
      subject: `Contact Us - ${firstName} ${lastName}`,
      text: message,
    };

    const info = await transporter.sendMail(mailConfigurations);
    console.log(info);

    res.status(201).json({ message: 'Mail sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error sending email' });
  }
}
