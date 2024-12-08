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
import { isAdmin } from "../middleware/admin.js"; // Adjust the import based on your middleware path
import { validateRequest } from "../middleware/validateRequest.js";
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
router.post("/register", validateRequest(registerSchema), register);

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
router.post("/login", validateRequest(loginSchema), login);

/**
 * @swagger
 * /auth/editUser/{id}:
 *  patch:
 *   summary: Edit User
 *   tags: [Auth]
 *   parameters:
 *   - in: path
 *     name: id
 *     required: true
 *     schema:
 *       type: string
 *     description: The ID of the user to update.
 *   - in: formData
 *     name: firstName
 *     schema:
 *       type: string
 *     description: Enter your First Name.
 *   - in: formData
 *     name: lastName
 *     schema:
 *       type: string
 *     description: Enter your Last Name.
 *   - in: formData
 *     name: email
 *     schema:
 *       type: string
 *     description: Enter your email.
 *   - in: formData
 *     name: age
 *     schema:
 *       type: string
 *     description: Enter your Age.
 *   - in: formData
 *     name: profilePicture
 *     schema:
 *       type: string
 *     description: Base64-encoded string of the profile picture.
 *   responses:
 *     '200':
 *       description: User details changed successfully.
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
router.patch("/resetPassword/:id", authentication, validateRequest(resetPasswordSchema), resetPassord);


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
