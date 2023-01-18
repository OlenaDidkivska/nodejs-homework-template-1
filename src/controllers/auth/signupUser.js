const { Conflict } = require("../../helpers/errors");
const service = require("../../service/auth");

const signupUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    await service.signup(email, password);

    res.status(201).json({ message: "User signup" });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error")) {
      next(new Conflict("Email in use"));
    }
  }
};

module.exports = signupUser;
