const service = require("../../service/userService");

const updateSubscription = async (req, res, next) => {
  if (!req.body) {
    return res.status(400).json({ message: "missing field favorite" });
  }
  const {id: userId} = req.user;
  const user = service.changeSubscription(userId, req.body)
  res.status(200).json({
    data: user,
    ok: true,
  });
};

module.exports = updateSubscription;
