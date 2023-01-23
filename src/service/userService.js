const User = require("./schemas/auth");

const current = (id) => {
  return User.findById(id);
};

const changeSubscription = (userId, body) => {

  return User.findByIdAndUpdate({_id: userId}, {...body});
}

module.exports = {
  current,
  changeSubscription
};
