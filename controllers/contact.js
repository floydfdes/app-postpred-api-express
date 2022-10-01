import express from "express";
import Contact from "../models/contact.js";
import { transporter } from "../utills/email.js";

const router = express.Router();

export const sendContactUsEmail = async (req, res) => {
  const body = req.body;
  const { firstName, lastName, email, message } = body;

  try {
    const mailConfigurations = {
      from: `${email}`,
      to: "postpredapp@gmail.com",
      subject: `Contact_Us_${firstName} ${lastName}`,
      text: message,
    };
    transporter.sendMail(mailConfigurations, function (err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log(info);
      }
    });

    res.status(201).json("Mail sent successfully");
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
