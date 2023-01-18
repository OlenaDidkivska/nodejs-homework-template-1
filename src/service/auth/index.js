const bcrypt = require("bcrypt");
const { Unauthorized } = require("../../helpers/errors");
const jwt = require("jsonwebtoken");
const User = require("../schemas/auth");

const signup = async (email, password) => {
  const user = new User({
    email,
    password,
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
      _id: user._id,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
    process.env.JWT_SECRET
  );

  return token;
};

const logout = (body) => {
  const { name, phone, email, favorite } = body;
  return User.create({ name, phone, email, favorite });
};

const current = (id, body) => {
  const { name, phone, email } = body;
  return User.findByIdAndUpdate(id, { name, phone, email }, { new: true });
};

module.exports = {
  signup,
  login,
  logout,
  current,
};
