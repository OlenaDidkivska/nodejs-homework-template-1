const { sendMail } = require("../../helpers");
const { BadRequest } = require("../../helpers/errors");
const User = require("../../service/schemas/auth");

const repeatVerifyEmail = async (req, res, next) => {
    const {email} = req.body;

    if(!email){
        throw new BadRequest('missing required field email')
    }

    const user = await User.findOne({ email });

  if (!user) {
    throw new Unauthorized(`User with such an email ${email} does not found`);
  }

  if(user.verify) {
    throw new BadRequest(`Verification has already been passed`);
  }

  await sendMail({
    to: email,
    subject: "Please confirm your email",
    html: `<a href="http://localhost:3001/api/user/verify/${user.verificationToken}">Confirm your email</a>`,
  })

  res.json({
    code: 200,
    message: 'Verification email sent',
  });
  }
  
  
  module.exports = repeatVerifyEmail;