const service = require("../../service/userService");

const logoutUser = async (req, res, next) => {
  const {id} = req.user;
  const user = await service.current(id);

  if (!user) {
    next(new Unauthorized("Not authorized"));
  }


  res.json({
    status: "No content",
    code: 204
  });
};

module.exports = { logoutUser };
