const jwt = require("jsonwebtoken");

const secret = "rushi123";


function generateToken(user) {
    return jwt.sign(
        {
            id: user._id,
            username: user.username,
            role: user.role
        },
        secret,
        {
            expiresIn: "1h"
        }
    );
}

function verifyToken(token) {
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        console.log("JWT ERROR:", error.name);
        console.log("JWT MESSAGE:", error.message);
        return null;
    }
}

// function setUser(user) {
//     return jwt.sign({
//         _id: user.id,
//         email: user.email
//     }, secret);
// }

// function getUser(token) {
//     try {
//         return jwt.verify(token, secret);
//     } catch {
//         return null;
//     }
// }

module.exports = {
    generateToken, verifyToken
}