const { Conflict } = require("../../helpers/errors");
const service = require("../../service/authService");

const signupUser = async (req, res, next) => {
  try {
    const { email, password} = req.body;
    const user = await service.signup(email, password);
    console.log("test4");

    res.status(201).json({ message: `User ${email} signup`, data: user.avatarURL});
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error")) {
      next(new Conflict("Email in use"));
    }
  }
};

module.exports = signupUser;
