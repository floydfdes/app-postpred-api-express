import {
  deleteUser,
  editUser,
  getAllUsers,
  login,
  register,
  resetPassord,
} from "../controllers/auth.js";
import { editUserSchema, loginSchema, registerSchema, resetPasswordSchema } from "../validation/userValidation.js";

import express from "express";
import { isAdmin } from "../middleware/admin.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { authentication } from "./validateToken.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: API to manage your auth.
 */

/**
 * @swagger
 * /auth/register:
 *  post:
 *   summary: Register a new user
 *   tags: [Auth]
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             firstName:
 *               type: string
 *               description: Enter your first name.
 *             lastName:
 *               type: string
 *               description: Enter your last name.
 *             age:
 *               type: number
 *               description: Enter your age.
 *             gender:
 *               type: string
 *               description: Enter your gender.
 *             email:
 *               type: string
 *               description: Enter your email.
 *             password:
 *               type: string
 *               description: Enter your password.
 *           required:
 *             - firstName
 *             - lastName
 *             - age
 *             - gender
 *             - email
 *             - password
 *   responses:
 *     '200':
 *       description: User registered successfully.
 */
router.post("/register", validateRequest(registerSchema), register);

/**
 * @swagger
 * /auth/login:
 *  post:
 *   summary: Login a user
 *   tags: [Auth]
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               description: Enter your email.
 *             password:
 *               type: string
 *               description: Enter your password.
 *           required:
 *             - email
 *             - password
 *   responses:
 *     '200':
 *       description: User logged in successfully.
 */
router.post("/login", validateRequest(loginSchema), login);

/**
 * @swagger
 * /auth/editUser/{id}:
 *  patch:
 *   summary: Edit a user's details
 *   tags: [Auth]
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: string
 *       description: The ID of the user to update.
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             firstName:
 *               type: string
 *               description: Enter your first name.
 *             lastName:
 *               type: string
 *               description: Enter your last name.
 *             email:
 *               type: string
 *               description: Enter your email.
 *             age:
 *               type: number
 *               description: Enter your age.
 *             profilePicture:
 *               type: string
 *               description: Base64-encoded string of the profile picture.
 *   responses:
 *     '200':
 *       description: User details updated successfully.
 *     '403':
 *       description: Email already in use by another user.
 *     '404':
 *       description: User not found.
 *     '500':
 *       description: Internal server error.
 */
router.patch("/editUser/:id", validateRequest(editUserSchema), editUser);

/**
 * @swagger
 * /auth/deleteUser/{id}:
 *  delete:
 *   summary: Delete a user
 *   tags: [Auth]
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: string
 *       description: The ID of the user to delete.
 *   responses:
 *     '200':
 *       description: User deleted successfully.
 *     '404':
 *       description: User not found.
 */
router.delete("/deleteUser/:id", authentication, deleteUser);

/**
 * @swagger
 * /auth/resetPassword/{id}:
 *  patch:
 *   summary: Reset a user's password
 *   tags: [Auth]
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: string
 *       description: The ID of the user.
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             newPassword:
 *               type: string
 *               description: Enter the new password.
 *   responses:
 *     '200':
 *       description: Password reset successfully.
 *     '404':
 *       description: User not found.
 */
router.patch("/resetPassword/:id", authentication, validateRequest(resetPasswordSchema), resetPassord);

/**
 * @swagger
 * /auth/users:
 *  get:
 *   summary: Fetch all users
 *   tags: [Auth]
 *   responses:
 *     '200':
 *       description: Successfully retrieved users.
 *     '404':
 *       description: No users found.
 */
router.get("/users", authentication, isAdmin, getAllUsers);

export default router;
