import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.js";
import { registerValidation, loginValidation } from "../Validation/validate.js";
import bcrypt from "bcryptjs";

dotenv.config();

export const login = async (req, res) => {
  const { email, password } = req.body;

  // const { error } = loginValidation(body);
  // if (error) res.status(400).send(error.details[0].message);
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send("Email doesnt exists");

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return res.status(400).send("Password is not valid");

    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.SECRET_TOKEN,
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const register = async (req, res) => {
  const { firstName, lastName, age, gender, email, password } = req.body;

  try {
    const uniqueEmail = await User.findOne({ email });
    if (uniqueEmail) return res.status(400).send("Email already exists");
    // const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, 12);
    const result = await User.create({
      email,
      password: hashPassword,
      firstName,
      lastName,
      age,
      gender,
    });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.SECRET_TOKEN,
      { expiresIn: "1h" }
    );
    res.status(200).json({ result, token });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const editUser = async (req, res) => {
  const { id } = req.params;
  try {
    const { firstName, lastName, age, email } = req.body;
    const uniqueEmail = await User.findOne({ email });
    if (!uniqueEmail) return res.status(403).send("Email doesnt exists");
    const updatedUser = new User({ firstName, lastName, age, _id: id });
    const result = await User.findByIdAndUpdate(id, updatedUser, {
      new: true,
    });
    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.SECRET_TOKEN,
      { expiresIn: "1h" }
    );
    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await User.findByIdAndRemove(id);
    res.status(200).json({ result: null, token: null });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const resetPassord = async () => {};
