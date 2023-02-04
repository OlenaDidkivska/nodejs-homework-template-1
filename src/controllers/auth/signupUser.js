const { v4 } = require("uuid");
const { sendMail } = require("../../helpers");
const { Conflict } = require("../../helpers/errors");
const service = require("../../service/authService");

const signupUser = async (req, res, next) => {
  try {
    const verificationToken = v4()
    const { email, password} = req.body;
    const user = await service.signup(email, password, verificationToken);

    await sendMail({
      to: email,
      subject: "Please confirm your email",
      html: `<a href="http://localhost:3001/api/user/verify/${verificationToken}">Confirm your email</a>`,
    })

    res.status(201).json({ message: `User ${email} signup`, data: user.avatarURL});
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error")) {
      next(new Conflict("Email in use"));
    }
  }
};

module.exports = signupUser;
