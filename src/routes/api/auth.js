const express = require("express");

const { tryCatchWrapper } = require("../../helpers");
const ctrlUser = require("../../controllers/auth");
const userValidation = require("../../middlewares/validation/users");
const { authMiddleware } = require("../../middlewares/validation/users/auth");

const router = new express.Router();

router.post("/signup", userValidation, tryCatchWrapper(ctrlUser.signupUser));

router.post("/login", userValidation, tryCatchWrapper(ctrlUser.loginUser));

router.get("/logout", authMiddleware, tryCatchWrapper(ctrlUser.logoutUser));

module.exports = { authRouter: router };
