import { request, response } from "express";
import userService from "../services/user.service.js";

const create = async(req = request, res = response) => {
    try {
        const user = await userService.create(req.body);
        return res.status(201).json({
            message: "User created",
            user
        });
    } catch (error) {
        return res.status(500).json({
            message: "An error occurred while creating",
            error: error.message
        });
    }
};

const getAll = async(req = request, res = response) => {
    try {
        const user = await userService.getAll();
        if (!user) {
            return res.status(404).json({
                message: "Users not found"
            });
        }
        return res.status(200).json({
            message: "Users retrieved successfully",
            user
        });
    } catch (error) {
        return res.status(500).json({
            message: "An error occurred while retrieving users",
            error: error.message
        });
    }
};

const getById = async(req = request, res = response) => {
    try {
        const { id } = req.params;
        const user = await userService.getById(id);
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        return res.status(200).json({
            message: "User retrieved successfully",
            user
        });
    } catch (error) {
        return res.status(500).json({
            message: "An error occurred while retrieving user",
            error: error.message
        });
    }
};

const update = async(req = request, res = response) => {
    try {
        const { id } = req.params;
        const { name, last_name, email, password } = req.body;
        const user = await userService.getById(id);
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        const dataToUpdate = {
            name: name || user.name,
            last_name: last_name || user.last_name,
            email: email || user.email,
            password: password || user.password
        };
        await userService.update(id, dataToUpdate);
        return res.status(200).json({
            message: "User updated successfully",
            user
        });
    } catch (error) {
        return res.status(500).json({
            message: "An error occurred while updating user",
            error: error.message
        });
    }
};

const deleteById = async(req = request, res = response) => {
    try {
        const { id } = req.params;
        const user = await userService.deleteById(id);
        return res.status(200).json({
            message: "User deleted successfully",
            user
        });
    } catch (error) {
        return res.status(500).json({
            message: "An error occurred while deleting user",
            error: error.message
        });
    }
};

export default {
    create,
    getAll,
    getById,
    update,
    deleteById
};
