const User = require("../../service/schemas/auth");

const verifyEmail = async (req, res, next) => {
    const { verificationToken} = req.params;
  const user = await User.findOne(
    {verificationToken}
)

console.log(user);

  if (!user) {
    res.status(400).json({ message: `User not found` });
    return;
  }

  console.log("User TRUE");

  await User.findByIdAndUpdate(user.id, { verificationToken: null, verify: true }, { new: true });

  res.json({
    code: 200,
    message: 'Verification successful',
  });
  }
  
  
  module.exports = verifyEmail;