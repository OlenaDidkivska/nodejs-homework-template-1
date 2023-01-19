const { Unauthorized } = require("../../../helpers/errors");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const [tokenType, token] = req.headers["authorization"].split(" ");
  console.log(tokenType);
  if (!token) {
    next(new Unauthorized("Not authorized"));
  }

  try {
    const user = jwt.decode(token, process.env.JWT_SECRET);
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    next(new Unauthorized("Invalid token"));
  }
};

module.exports = { authMiddleware };
