const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar")

const { Unauthorized } = require("../helpers/errors");
const User = require("./schemas/auth");


const signup = async (email, password) => {
  const avatarURL = gravatar.url(email, {format:'jpg'});

  const user = new User({
    email,
    password,
    avatarURL
  });

  return user.save();
};

const login = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Unauthorized(`User with such an email ${email} does not found`);
  }

  if (!(await bcrypt.compare(password, user.password))) {
    throw new Unauthorized("Email or password is wrong");
  }

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      createdAt: user.createdAt,
      avatarURL: user.avatarURL
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  return token;
};

module.exports = {
  signup,
  login
};
