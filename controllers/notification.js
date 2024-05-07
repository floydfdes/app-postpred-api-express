import Notification from '../models/notification.js';
import User from '../models/user.js';
import { transporter } from "../utills/email.js";

export const sendNotification = async (recipientId, type, postId, commentId, senderId) => {
    try {
        const recipient = await User.findById(recipientId);
        if (!recipient) throw new Error('Recipient not found');

        const notification = new Notification({
            recipient: recipientId,
            type,
            postId,
            commentId,
            sender: senderId,
        });

        await notification.save();

        const mailOptions = {
            from: 'floyd.fernandes.dev@gmail.com',
            to: recipient.email,
            subject: 'New Notification',
            text: `You have a new notification of type ${type}`,
        };

        await transporter.sendMail(mailOptions);

        return notification;
    } catch (error) {
        console.error('Error sending notification:', error);
        throw new Error('Error sending notification');
    }
};
