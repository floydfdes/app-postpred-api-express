import express from "express";
import Hobby from "../models/newHobby.js";

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
    postImage: body.postImage || "",
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
  const { title, tags, description, likes, postImage } = req.body;

  try {
    const post = await Hobby.findById(id);

    if (!post) {
      return res.status(404).send(`No post found with id: ${id}`);
    }

    const updatedData = {
      title: title || post.title,
      description: description || post.description,
      tags: tags || post.tags,
      likes: likes || post.likes,
      postImage: postImage || post.postImage,
    };

    const updatedPost = await Hobby.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
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
  res.json(updatedPost);
};
export const getAllPosts = async (req, res) => {
  console.log('object');
  const posts = await Hobby.find();
  res.send(posts);
};

export default router;
