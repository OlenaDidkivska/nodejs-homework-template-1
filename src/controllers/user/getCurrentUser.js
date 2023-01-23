const getCurrentUser = async (req, res, next) => {
  const {user} = req;
  const {id, email} = user
  res.status(200).json({
    data: {id, email},
    ok: true,
  });
};

module.exports = getCurrentUser;
