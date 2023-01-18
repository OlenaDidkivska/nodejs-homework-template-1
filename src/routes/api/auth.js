const express = require("express");

const { tryCatchWrapper } = require("../../helpers");
const ctrlUser = require("../../controllers/auth");
const userValidation = require("../../middlewares/validation/users");

const router = new express.Router();

router.post("/signup", userValidation, tryCatchWrapper(ctrlUser.signupUser));

router.post("/login", userValidation, tryCatchWrapper(ctrlUser.loginUser));

router.get("/logout", tryCatchWrapper(ctrlUser.logoutUser));

router.get("/current", tryCatchWrapper(ctrlUser.getCurrentUser));

module.exports = { authRouter: router };
