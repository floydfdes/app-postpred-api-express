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

        res.status(200).json(post);
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

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteComment = async (req, res) => {
    const { postId, commentId } = req.params;

    try {
        const post = await Hobby.findById(postId);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const commentIndex = post.comments.findIndex((comment) => comment._id.toString() === commentId);

        if (commentIndex === -1) {
            return res.status(404).json({ message: "Comment not found" });
        }

        post.comments.splice(commentIndex, 1);

        await post.save();

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const likeComment = async (req, res) => {

    const { postId, commentId } = req.params;
    const userId = req.userId;


    try {
        const post = await Hobby.findById(postId);
        console.log(post);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const comment = post.comments.id(commentId);

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        if (comment.dislikes.includes(userId)) {
            comment.dislikes.pull(userId);
        }

        if (comment.likes.includes(userId)) {
            comment.likes = comment.likes.filter((id) => id !== String(userId));
        }
        else {
            comment.likes.push(userId);
        }

        await post.save();

        const updatedPost = await Hobby.findById(postId).populate('comments');
        res.status(200).json({ message: 'Comment liked successfully', post: updatedPost });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



export const dislikeComment = async (req, res) => {
    const { postId, commentId } = req.params;
    const userId = req.userId;

    try {
        const post = await Hobby.findById(postId);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const comment = post.comments.id(commentId);

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        if (comment.likes.includes(userId)) {
            comment.likes.pull(userId);
        }

        if (comment.dislikes.includes(userId)) {
            comment.dislikes = comment.dislikes.filter((id) => id !== String(userId));
        }
        else {
            comment.dislikes.push(userId);
        }


        await post.save();

        // Send back the updated post
        const updatedPost = await Hobby.findById(postId).populate('comments');
        res.status(200).json({ message: 'Comment disliked successfully', post: updatedPost });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getAllComments = async (req, res) => {
    try {
        const comments = await Hobby.find().select("comments");
        const allComments = comments.flatMap(post => post.comments);

        if (allComments.length === 0) {
            return res.status(404).json({ message: "No comments found" });
        }

        res.status(200).json(allComments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


