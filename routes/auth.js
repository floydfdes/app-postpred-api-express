import {
  deleteUser,
  editUser,
  getAllUsers,
  login,
  register,
  resetPassord,
} from "../controllers/auth.js";

import express from "express";
import { isAdmin } from "../middleware/admin.js"; // Adjust the import based on your middleware path
import { authentication } from "./validateToken.js";

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: API to manage your auth.
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
 *     description: Enter your password.
 *   responses:
 *     '200':
 *       description: user logged in
 */
router.post("/login", login);

/**
 * @swagger
 * /auth/editUser/{id}:
 *  patch:
 *   summary: Edit User
 *   tags: [Auth]
 *   parameters:
 *   - in: path
 *     name: id
 *     type: string
 *     description: The Id to update.
 *   - in: formData
 *     name: firstName
 *     type: string
 *     description: Enter your First Name.
 *   - in: formData
 *     name: lastName
 *     type: string
 *     description: Enter your Last Name.
 *   - in: formData
 *     name: email
 *     type: string
 *     description: Enter your email.
 *   - in: formData
 *     name: age
 *     type: string
 *     description: Enter your Age.
 *   responses:
 *     '200':
 *       description: User Details changed successfully
 */
router.patch("/editUser/:id", editUser);

/**
 * @swagger
 * /auth/deleteUser/{id}:
 *  delete:
 *   summary: delete User
 *   tags: [Auth]
 *   parameters:
 *   - in: path
 *     name: id
 *     type: string
 *     description: The Id to update.
 *   responses:
 *     '200':
 *       description: User Deleted
 */
router.delete("/deleteUser/:id", authentication, deleteUser);

/**
 * @swagger
 * /auth/resetPassword/{id}:
 *  post:
 *   summary: reset password
 *   tags: [Auth]
 *   parameters:
 *   - in: formData
 *     name: newPassword
 *     type: string
 *     description: Enter new Password.
 *   responses:
 *     '200':
 *       description: User Details changed successfully
 */
router.patch("/resetPassword/:id", authentication, resetPassord);


/**
 * @swagger
 * /auth/users:
 *  get:
 *   summary: Fetch all users
 *   tags: [Auth]
 *   responses:
 *     '200':
 *       description: Successfully retrieved users
 *     '404':
 *       description: No users found
 */
router.get("/users", authentication, isAdmin, getAllUsers);

export default router;
