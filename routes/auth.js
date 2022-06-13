import express from "express";
import { login, register } from "../controllers/auth.js";

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: API to manage your books.
 *
 */

/**
 * @swagger
 * /auth/register:
 *  post:
 *   summary: login
 *   tags: [Auth]
 *   parameters:
 *   - in: formData
 *     name: firstName
 *     type: string
 *     description: Enter your first Name.
 *   - in: formData
 *     name: lastName
 *     type: string
 *     description: Enter your last Name.
 *   - in: formData
 *     name: age
 *     type: number
 *     description: Enter your age.
 *   - in: formData
 *     name: gender
 *     type: string
 *     description: Enter your gender.
 *   - in: formData
 *     name: email
 *     type: string
 *     description: Enter your email.
 *   - in: formData
 *     name: password
 *     type: string
 *     description: Enter your password.
 *   responses:
 *     '200':
 *       description: user logged in
 */
router.post("/register", register);

/**
 * @swagger
 * /auth/login:
 *  post:
 *   summary: login
 *   tags: [Auth]
 *   parameters:
 *   - in: formData
 *     name: email
 *     type: string
 *     description: Enter your name.
 *   - in: formData
 *     name: password
 *     type: string
 *     description: Enter your age.
 *   responses:
 *     '200':
 *       description: user logged in
 */
router.post("/login", login);

export default router;
