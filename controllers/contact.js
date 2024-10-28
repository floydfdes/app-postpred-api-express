import Contact from "../models/contact.js";
import express from "express";
import { transporter } from "../utills/email.js";

const router = express.Router();

const isValidEmail = (email) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);

export const sendContactUsEmail = async (req, res) => {
  const { firstName, lastName, email, message } = req.body;

  if (!firstName || !lastName || !email || !message) {
    return res.status(400).json({ message: 'All fields are required.' });
  }
  
  if (!isValidEmail(email)) {
    return res.status(400).json({ message: 'Invalid email format.' });
  }

  try {
    const mailConfigurations = {
      from: email,
      to: 'floyd.fernandes.dev@gmail.com',
      subject: `Contact Us - ${firstName} ${lastName}`,
      text: message,
    };

    const info = await transporter.sendMail(mailConfigurations);
    console.log("Email sent successfully:", info.messageId);

    return res.status(201).json({ 
      message: 'Mail sent successfully', 
      details: info.messageId 
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ 
      message: 'Error sending email',
      error: error.message || 'Unexpected error occurred'
    });
  }
};

export default router;