const { Unauthorized } = require("../../../helpers/errors");
const jwt = require("jsonwebtoken");

const authMiddleware = async(req, res, next) => {
  const authHeader = req.headers["authorization"] || "";
  const [type, token] = authHeader.split(" ");

  if (type !== "Bearer") {
    next(new Unauthorized("Token type is not valid"));
  }

  if (!token) {
    next(new Unauthorized("Not authorized"));
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    
    req.token = token;
    req.user = user;

    next();
  } catch (error) {
    next(new Unauthorized("Invalid token"));
  }
};



module.exports = { authMiddleware};
