const userService = require("../service/user.service");
const authService = require("../service/auth.service");
const User = require("../models/user.models");

async function registerUser(req, res, next) {
    try {
        const user = await userService.createUser(req.body);

        res.status(201).json({
            sucess: true,
            message: "User registed successfully",
            data: {
                id: user._id,
                username: user.username,
                currentWorkingStatus: user.currentWorkingStatus,
                role: user.role
            }
        });
    }
    catch (error) {
        next(error);
    }
}

async function loginUser(req, res, next) {
    try {
        const { username, password } = req.body;

        const user = await userService.authenticateUser(username, password);

        const token = authService.generateToken(user);

        res.status(200).json({
            success: true,
            message: "Login Successful",
            data: {
                token
            }
        });
    } catch (error) {
        next(error);
    }
}

async function getAllUsers(req, res, next) {
    try {
        const users = await User.find();

        res.status(200).json({
            success: true,
            data: users
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    registerUser,
    loginUser,
    getAllUsers
}