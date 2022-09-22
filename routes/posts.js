import express from "express";
import { authentication } from "./validateToken.js";
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  likePost,
  deletePost,
} from "../controllers/posts.js";

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Hobbies
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
 * /posts:
 *  post:
 *   summary: create a post
 *   tags: [Hobbies]
 *   parameters:
 *   - in: formData
 *     name: title
 *     type: string
 *     description: Enter post title.
 *   - in: formData
 *     name: description
 *     type: string
 *     description: Enter  post description.
 *   - in: formData
 *     name: tags
 *     type: [string]
 *     description: Tags related to your hobbies.
 *   responses:
 *     '201':
 *       description: post was created
 */
router.post("/", authentication, createPost);
router.get("/:id", getPost);

/**
 * @swagger
 * /posts/{id}:
 *  patch:
 *   summary: update a  post
 *   tags: [Hobbies]
 *   parameters:
 *   - in: path
 *     name: id
 *     type: string
 *     description: The id you want to update.
 *   - in: formData
 *     name: title
 *     type: string
 *     description: Enter your title.
 *   - in: formData
 *     name: description
 *     type: string
 *     description: Enter your description.
 *   - in: formData
 *     name: tags
 *     type: [string]
 *     description: Tags related to your hobbies.

 *   responses:
 *     '201':
 *       description: post was updated
 */
router.patch("/:id", authentication, updatePost);

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
