const express = require("express");

const { tryCatchWrapper } = require("../../helpers");
const ctrlUser = require("../../controllers/auth");
const { userValidation, authMiddleware } = require("../../middlewares/validation/users");

const router = new express.Router();

router.post("/signup", userValidation, tryCatchWrapper(ctrlUser.signupUser));

router.post("/login", userValidation, tryCatchWrapper(ctrlUser.loginUser));

router.get("/logout", authMiddleware, tryCatchWrapper(ctrlUser.logoutUser));

module.exports = { authRouter: router };
