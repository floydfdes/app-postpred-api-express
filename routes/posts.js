import {
  createPost,
  deletePost,
  getAllPosts,
  getPost,
  getPosts,
  likePost,
  updatePost,
} from "../controllers/posts.js";
import { createPostSchema, updatePostSchema } from "../validation/postValidation.js";

import express from "express";
import { validateRequest } from "../middleware/validateRequest.js";
import { authentication } from "./validateToken.js";

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Interest
 *   description: API to manage your posts.
 *
 */

//Routes
/**
 * @swagger
 * /posts:
 *  get:
 *   summary: get all the posts
 *   tags: [Hobbies]
 *   responses:
 *     '200':
 *       description: suceess
 */
router.get("/", getPosts);

/**
 * @swagger
 * /posts/getAllPosts:
 *  get:
 *   summary: get all the posts
 *   tags: [Hobbies]
 *   responses:
 *     '200':
 *       description: suceess
 */
router.get("/posts/getAllPosts", getAllPosts);

/**
 * @swagger
 * /posts:
 *  post:
 *   summary: Create a post
 *   tags: [Hobbies]
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *               description: Enter post title.
 *             description:
 *               type: string
 *               description: Enter post description.
 *             tags:
 *               type: array
 *               items:
 *                 type: string
 *               description: Tags related to your hobbies.
 *             postImage:
 *               type: string
 *               description: Base64 string for the post image.
 *   responses:
 *     '201':
 *       description: Post was created.
 *     '400':
 *       description: Bad request.
 *     '500':
 *       description: Internal server error.
 */
router.post("/", authentication, validateRequest(createPostSchema), createPost);

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Get a single post by ID
 *     tags: [Hobbies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the post
 *     responses:
 *       '200':
 *         description: Successfully retrieved the post
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The unique ID of the post
 *                 title:
 *                   type: string
 *                   description: Title of the post
 *                 description:
 *                   type: string
 *                   description: Description of the post
 *                 tags:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Tags associated with the post
 *                 creatorName:
 *                   type: string
 *                   description: Name of the creator
 *                 creator:
 *                   type: string
 *                   description: The user ID of the creator
 *                 likes:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Array of user IDs who liked the post
 *                 comments:
 *                   type: array
 *                   description: Comments on the post
 *                   items:
 *                     type: object
 *                     properties:
 *                       content:
 *                         type: string
 *                         description: Content of the comment
 *                       userId:
 *                         type: string
 *                         description: The user ID of the commenter
 *                       likes:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             _id:
 *                               type: string
 *                               description: User ID who liked the comment
 *                             name:
 *                               type: string
 *                               description: Name of the user
 *                             avatarUrl:
 *                               type: string
 *                               description: Avatar URL of the user
 *                       dislikes:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             _id:
 *                               type: string
 *                               description: User ID who disliked the comment
 *                             name:
 *                               type: string
 *                               description: Name of the user
 *                             avatarUrl:
 *                               type: string
 *                               description: Avatar URL of the user
 *                       likesCount:
 *                         type: integer
 *                         description: Number of likes on the comment
 *                       dislikesCount:
 *                         type: integer
 *                         description: Number of dislikes on the comment
 *                       userLiked:
 *                         type: boolean
 *                         description: Whether the current user liked the comment
 *                       userDisliked:
 *                         type: boolean
 *                         description: Whether the current user disliked the comment
 *                 date:
 *                   type: string
 *                   format: date-time
 *                   description: Date when the post was created
 *       '404':
 *         description: Post not found
 *       '500':
 *         description: Server error
 */
router.get("/:id", getPost);

/**
 * @swagger
 * /posts/{id}:
 *  patch:
 *   summary: Update a post
 *   tags: [Hobbies]
 *   parameters:
 *   - in: path
 *     name: id
 *     required: true
 *     schema:
 *       type: string
 *     description: The ID of the post you want to update.
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *               description: Enter your title.
 *             description:
 *               type: string
 *               description: Enter your description.
 *             tags:
 *               type: array
 *               items:
 *                 type: string
 *               description: Tags related to your hobbies.
 *             postImage:
 *               type: string
 *               description: Base64 string for the post image.
 *   responses:
 *     '200':
 *       description: Post was updated.
 *     '400':
 *       description: Bad request.
 *     '404':
 *       description: Post not found.
 *     '500':
 *       description: Internal server error.
 */
router.patch("/:id", authentication, validateRequest(updatePostSchema), updatePost);



/**
 * @swagger
 * /posts/{id}:
 *  delete:
 *   summary: delete a post
 *   tags: [Hobbies]
 *   parameters:
 *   - in: path
 *     name: id
 *     type: string
 *     description: Id of the post.
 *   responses:
 *     '201':
 *       description: post was deleted
 */
router.delete("/:id", authentication, deletePost);

/**
 * @swagger
 * /posts/{id}/likePost:
 *  patch:
 *   summary: like your post
 *   tags: [Hobbies]
 *   parameters:
 *   - in: path
 *     name: id
 *     type: string
 *     description: Is of the post.
 *   responses:
 *     '201':
 *       description: user was created
 */
router.patch("/:id/likePost", authentication, likePost);

export default router;
