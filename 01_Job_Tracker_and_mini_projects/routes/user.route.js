const express = require("express");
const { registerUser, loginUser, getAllUsers } = require("../controllers/user.controllers.js")
const authorizeRoles = require("../middleware/autorization.middleware.js")
const authenticate = require("../middleware/auth.middleware.js")

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/listusers", authenticate, authorizeRoles("admin"), getAllUsers);

module.exports = router;