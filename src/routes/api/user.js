const express = require("express");

const { tryCatchWrapper } = require("../../helpers");
const ctrlUser = require("../../controllers/user");
const { authMiddleware } = require("../../middlewares/validation/users/auth");
const uploadMiddleware = require("../../middlewares/validation/users/uploadImage");

const userRouter = new express.Router();

userRouter.use(authMiddleware);
userRouter.get("/current", tryCatchWrapper(ctrlUser.getCurrentUser));
userRouter.patch("/avatars", uploadMiddleware.single("image"), tryCatchWrapper(ctrlUser.updateAvatar))

module.exports = { userRouter };
