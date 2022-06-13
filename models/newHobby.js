import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: String,

  tags: [String],
  description: String,
  likes: {
    type: [String],
    default: [],
  },
  creatorName: String,
  creator: String,
  date: {
    type: Date,
    default: new Date().getTime(),
  },
});

var Hobby = mongoose.model("Hobby", postSchema);

export default Hobby;
