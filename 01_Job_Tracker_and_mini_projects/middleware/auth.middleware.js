const authService = require("../service/auth.service");
const { authenticateUser } = require("../service/user.service");

function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;

    //console.log("authHeader : ", authHeader)

    if (!authHeader) {
        return res.status(401).json({
            success: false,
            message: "Authentication required"
        });
    }

    const [scheme, token] = authHeader.split(" ");

    if (scheme !== "Bearer" || !token) {
        return res.statu(401).json({
            success: false,
            message: "Invalid authorization format"
        });
    }
    //console.log("token: ", token);
    const user = authService.verifyToken(token);

    //console.log("verifytedUser: ", user);

    if (!user) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }

    req.user = user

    next();
}

module.exports = authenticate;
