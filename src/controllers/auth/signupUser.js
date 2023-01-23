const { Conflict } = require("../../helpers/errors");
const service = require("../../service/authService");

const signupUser = async (req, res, next) => {
  try {
    const { email, password, subscription} = req.body;
    const user = await service.signup(email, password, subscription);

    res.status(201).json({ message: `User ${email} signup`, data: {user: {email, subscription: user.subscription}}});
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error")) {
      next(new Conflict("Email in use"));
    }
  }
};

module.exports = signupUser;
