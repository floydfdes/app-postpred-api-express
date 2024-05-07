import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['post', 'comment', 'like', 'mention'], required: true },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
    commentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    timestamp: { type: Date, default: Date.now() },
    read: { type: Boolean, default: false }
});

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;
