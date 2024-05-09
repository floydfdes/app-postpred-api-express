import {
    assignRoleToUser,
    createRole,
    deleteRole,
    getAllRoles,
    getRoleById,
    manageRolePermissions,
    removeRoleFromUser,
    updateRole,
} from "../controllers/roles.js";

import express from "express";
import { authentication } from "./validateToken.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: API to manage user roles.
 *
 */

// Routes for Roles

/**
 * @swagger
 * /roles:
 *   get:
 *     summary: Get all roles
 *     tags: [Roles]
 *     responses:
 *       '200':
 *         description: Success
 */
router.get("/", authentication, getAllRoles);

/**
 * @swagger
 * /roles:
 *   post:
 *     summary: Create a new role
 *     tags: [Roles]
 *     parameters:
 *       - in: body
 *         name: role
 *         description: Role object to be created
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             permissions:
 *               type: array
 *               items:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Role created successfully
 */
router.post("/", authentication, createRole);

/**
 * @swagger
 * /roles/{roleId}:
 *   get:
 *     summary: Get role by ID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: roleId
 *         type: string
 *         description: ID of the role to retrieve
 *         required: true
 *     responses:
 *       '200':
 *         description: Success
 */
router.get("/:roleId", authentication, getRoleById);

/**
 * @swagger
 * /roles/{roleId}:
 *   patch:
 *     summary: Update a role
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: roleId
 *         type: string
 *         description: ID of the role to update
 *         required: true
 *       - in: body
 *         name: role
 *         description: Role object with updated fields
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             permissions:
 *               type: array
 *               items:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Role updated successfully
 */
router.patch("/:roleId", authentication, updateRole);

/**
 * @swagger
 * /roles/{roleId}:
 *   delete:
 *     summary: Delete a role
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: roleId
 *         type: string
 *         description: ID of the role to delete
 *         required: true
 *     responses:
 *       '200':
 *         description: Role deleted successfully
 */
router.delete("/:roleId", authentication, deleteRole);

/**
 * @swagger
 * /roles/{roleId}/permissions:
 *   patch:
 *     summary: Manage role permissions
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: roleId
 *         type: string
 *         description: ID of the role to manage permissions for
 *         required: true
 *       - in: body
 *         name: permissions
 *         description: Array of permission strings
 *         required: true
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *     responses:
 *       '200':
 *         description: Role permissions updated successfully
 */
router.patch("/:roleId/permissions", authentication, manageRolePermissions);

/**
 * @swagger
 * /roles/{roleId}/assignUser:
 *   patch:
 *     summary: Assign role to user
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: roleId
 *         type: string
 *         description: ID of the role to assign
 *         required: true
 *       - in: body
 *         name: userId
 *         description: ID of the user to assign the role to
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             userId:
 *               type: string
 *     responses:
 *       '200':
 *         description: Role assigned to user successfully
 */
router.patch("/:roleId/assignUser", authentication, assignRoleToUser);

/**
 * @swagger
 * /roles/{roleId}/removeUser:
 *   patch:
 *     summary: Remove role from user
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: roleId
 *         type: string
 *         description: ID of the role to remove
 *         required: true
 *       - in: body
 *         name: userId
 *         description: ID of the user to remove the role from
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             userId:
 *               type: string
 *     responses:
 *       '200':
 *         description: Role removed from user successfully
 */
router.patch("/:roleId/removeUser", authentication, removeRoleFromUser);

export default router;
