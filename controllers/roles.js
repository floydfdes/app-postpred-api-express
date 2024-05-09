import express from "express";
import Role from "../models/roles.js";

const router = express.Router();

export const getAllRoles = async (req, res) => {
    try {
        const roles = await Role.find();
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createRole = async (req, res) => {
    try {
        const role = await Role.create(req.body);
        res.status(201).json(role);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getRoleById = async (req, res) => {
    try {
        const role = await Role.findById(req.params.roleId);
        if (!role) {
            return res.status(404).json({ message: "Role not found" });
        }
        res.status(200).json(role);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateRole = async (req, res) => {
    try {
        const updatedRole = await Role.findByIdAndUpdate(
            req.params.roleId,
            req.body,
            { new: true }
        );
        if (!updatedRole) {
            return res.status(404).json({ message: "Role not found" });
        }
        res.status(200).json(updatedRole);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteRole = async (req, res) => {
    try {
        const deletedRole = await Role.findByIdAndDelete(req.params.roleId);
        if (!deletedRole) {
            return res.status(404).json({ message: "Role not found" });
        }
        res.status(200).json({ message: "Role deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const manageRolePermissions = async (req, res) => {
    try {
        const updatedRole = await Role.findByIdAndUpdate(
            req.params.roleId,
            { permissions: req.body.permissions },
            { new: true }
        );
        if (!updatedRole) {
            return res.status(404).json({ message: "Role not found" });
        }
        res.status(200).json(updatedRole);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const assignRoleToUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.roles.push(req.body.roleId);
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const removeRoleFromUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.roles = user.roles.filter((roleId) => roleId !== req.params.roleId);
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default router;
