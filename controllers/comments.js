import Hobby from "../models/newHobby.js";

export const createComment = async (req, res) => {
    console.log('object');
    const { id } = req.params; // Post ID
    const { content } = req.body;
    const userId = req.userId;

    try {
        const post = await Hobby.findById(id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const newComment = { content, userId };
        post.comments.push(newComment);

        await post.save();

        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateComment = async (req, res) => {
    const { postId, commentId } = req.params; // Post ID and Comment ID
    const { content } = req.body;

    try {
        const post = await Hobby.findById(postId);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const commentIndex = post.comments.findIndex((comment) => comment._id.toString() === commentId);

        if (commentIndex === -1) {
            return res.status(404).json({ message: "Comment not found" });
        }

        post.comments[commentIndex].content = content;

        await post.save();

        res.status(200).json(post.comments[commentIndex]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteComment = async (req, res) => {
    const { postId, commentId } = req.params; // Post ID and Comment ID

    try {
        const post = await Hobby.findById(postId);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const commentIndex = post.comments.findIndex((comment) => comment._id.toString() === commentId);

        if (commentIndex === -1) {
            return res.status(404).json({ message: "Comment not found" });
        }

        post.comments.splice(commentIndex, 1); // Remove the comment from the array

        await post.save();

        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
