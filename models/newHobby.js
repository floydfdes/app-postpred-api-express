import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  content: String,
  userId: String,
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: new Date().getTime() },
});

const postSchema = new mongoose.Schema({
  title: String,
  tags: [String],
  description: String,
  likes: { type: [String], default: [] },
  creatorName: String,
  creator: String,
  date: { type: Date, default: new Date().getTime() },
  comments: [commentSchema]
});

var Hobby = mongoose.model("Hobby", postSchema);

export default Hobby;
