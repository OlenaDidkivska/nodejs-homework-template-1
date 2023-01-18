const service = require("../../service/auth");

const getCurrentUser = async (req, res, next) => {
  await service.createUser(req.body);
  res.status(201).json({
    status: "User added successfully",
    code: 201,
  });
};

module.exports = getCurrentUser;
