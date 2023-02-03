const express = require("express");

const { tryCatchWrapper } = require("../../helpers");
const ctrlUser = require("../../controllers/user");
const { verifyMiddleware, authMiddleware, uploadMiddleware } = require("../../middlewares/validation/users");

const userRouter = new express.Router();

userRouter.use(authMiddleware);
userRouter.get("/current", tryCatchWrapper(ctrlUser.getCurrentUser));
userRouter.patch("/avatars", uploadMiddleware.single("image"), tryCatchWrapper(ctrlUser.updateAvatar));
userRouter.get("/verify/:verificationToken", verifyMiddleware, tryCatchWrapper(ctrlUser.sendMail))

module.exports = { userRouter };
