const service = require("../../service/auth");

const logoutUser = async (req, res) => {
  const results = await service.getAllUsers();
  res.json({
    status: "success",
    code: 200,
    data: results,
  });
};

module.exports = { logoutUser };
