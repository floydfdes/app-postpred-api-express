import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  lastName: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  description: String,
  date: {
    type: Date,
    default: new Date().getTime(),
  },
});

var Contact = mongoose.model("Contact", contactSchema);

export default Contact;
