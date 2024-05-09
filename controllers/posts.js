import express from "express";
import Hobby from "../models/newHobby.js";
import { sendNotification } from "./notification.js";

const router = express.Router();

export const getPosts = async (req, res) => {
  try {
    const Hobbys = await Hobby.find().sort({ date: -1 });

    res.status(200).json(Hobbys);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Hobby.findById(id);
    console.log(post);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const body = req.body;

  const newPost = new Hobby({
    ...body,
    creator: req.userId,
  });

  try {
    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  var { title, tags, description, likes } = req.body;
  var post = await Hobby.findById(id);
  if (!title) {
    title = post.title;
  }

  if (!description) {
    description = post.description;
  }
  if (!tags) {
    tags = post.tags;
  }
  if (!likes) {
    likes = post.likes;
  }
  // if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  const updatedPost = new Hobby({ title, description, tags, _id: id, likes });
  console.log(updatedPost);
  await Hobby.findByIdAndUpdate(id, updatedPost, { new: true });

  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  // if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  await Hobby.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully." });
};

export const likePost = async (req, res) => {
  console.log("reaching here");
  const { id } = req.params;

  if (!req.userId) return res.json({ message: "Unauthorized" });
  //if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  const post = await Hobby.findById(id);
  const index = post.likes.findIndex((id) => id === String(req.userId));
  if (index === -1) {
    post.likes.push(req.userId);
  } else {
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }

  const updatedPost = await Hobby.findByIdAndUpdate(id, post, { new: true });

  if (index === -1) {
    const senderId = req.userId;
    const recipientId = updatedPost.creator;
    const type = 'like';
    const postId = updatedPost._id;
    const commentId = null;
    await sendNotification(recipientId, type, postId, commentId, senderId);
  }
  res.json(updatedPost);
};

export const getAllPosts = async (req, res) => {
  const posts = await Hobby.find();
  res.send(posts);
};

export default router;
