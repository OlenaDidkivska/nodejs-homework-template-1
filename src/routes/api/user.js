const express = require("express");

const { tryCatchWrapper } = require("../../helpers");
const ctrlUser = require("../../controllers/user");
const { authMiddleware } = require("../../middlewares/validation/users/auth");

const userRouter = new express.Router();

userRouter.use(authMiddleware);
userRouter.get("/current", tryCatchWrapper(ctrlUser.getCurrentUser));
userRouter.patch("/", authMiddleware, tryCatchWrapper(ctrlUser.updateSubscription))

module.exports = { userRouter };
