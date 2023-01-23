const service = require("../../service/authService");

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  const token = await service.login(email, password);

  res.status(200).json({ message: "User login", token });
};

module.exports = loginUser;
