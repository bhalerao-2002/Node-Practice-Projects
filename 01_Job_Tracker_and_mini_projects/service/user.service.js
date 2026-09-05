const bcrypt = require("bcrypt");

const User = require("../models/user.models");


async function createUser(userData) {
    const { username, password, currentWorkingStatus } = userData;

    const existingUser = await User.findOne({ username });

    if (existingUser) {
        const error = new Error("Username alerady exists");
        error.statusCode = 409;
        throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
        username,
        password: hashedPassword,
        currentWorkingStatus
    });

    return user;
}


async function authenticateUser(username, password) {
    const user = await User.findOne({ username });

    if (!user) {
        const error = new Error("Invalid username or password");
        error.statusCode(401);
        throw error;
    }

    const passwordMatch = await bcrypt.compare(
        password,
        user.password
    );

    if (!passwordMatch) {
        const error = new Error("Invalid username or password");
        error.statusCode(401);
        throw error
    }

    return user;
}


module.exports = {
    createUser,
    authenticateUser
}