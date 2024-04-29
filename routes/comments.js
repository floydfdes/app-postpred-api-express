import { createComment, deleteComment, updateComment } from "../controllers/comments.js";

import { authentication } from "./validateToken.js";
import express from "express";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: API for managing comments on posts.
 */

/**
 * @swagger
 * /{id}/comments:
 *  post:
 *   summary: Create a new comment on a post
 *   tags: [Comments]
 *   parameters:
 *   - in: path
 *     name: id
 *     required: true
 *     schema:
 *       type: string
 *     description: Post ID where the comment will be added.
 *   - in: formData
 *     name: content
 *     type: string
 *     description: Enter comment content.
 *   responses:
 *     '201':
 *       description: Comment created successfully.
 *     '404':
 *       description: Post not found.
 *     '500':
 *       description: Internal server error.
 */
router.post("/:id/comments", authentication, createComment);

/**
 * @swagger
 * /{postId}/comments/{commentId}:
 *  patch:
 *   summary: Update a comment on a post
 *   tags: [Comments]
 *   parameters:
 *   - in: path
 *     name: postId
 *     required: true
 *     schema:
 *       type: string
 *     description: Post ID containing the comment.
 *   - in: path
 *     name: commentId
 *     required: true
 *     schema:
 *       type: string
 *     description: Comment ID to be updated.
 *   - in: formData
 *     name: content
 *     type: string
 *     description: Enter updated comment content.
 *   responses:
 *     '200':
 *       description: Comment updated successfully.
 *     '404':
 *       description: Post or comment not found.
 *     '500':
 *       description: Internal server error.
 */
router.patch("/:postId/comments/:commentId", authentication, updateComment);

/**
 * @swagger
 * /posts/{postId}/comments/{commentId}:
 *  delete:
 *   summary: Delete a comment on a post
 *   tags: [Comments]
 *   parameters:
 *   - in: path
 *     name: postId
 *     required: true
 *     schema:
 *       type: string
 *     description: Post ID containing the comment.
 *   - in: path
 *     name: commentId
 *     required: true
 *     schema:
 *       type: string
 *     description: Comment ID to be deleted.
 *   responses:
 *     '200':
 *       description: Comment deleted successfully.
 *     '404':
 *       description: Post or comment not found.
 *     '500':
 *       description: Internal server error.
 */
router.delete("/:postId/comments/:commentId", deleteComment);

export default router;
