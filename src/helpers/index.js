require("dotenv").config()
const { NodejsHomeworkError } = require("./errors");

const tryCatchWrapper = (enpointFn) => {
  return async (req, res, next) => {
    try {
      await enpointFn(req, res, next);
    } catch (error) {
      return next(error);
    }
  };
};

const errorHandler = (error, req, res, next) => {
  if (error instanceof NodejsHomeworkError) {
    console.log(error.message);
    return res.status(error.status).json({ message: error.message });
  }

  return res.status(500).json({ message: error.message });
};

const sendGrid = require('@sendgrid/mail')
const {SENDGRID_API_KEY, EMAIL_USER} = process.env;

const sendMail = async ({to, subject, html }) => {
  console.log(to, subject, html );
  sendGrid.setApiKey(SENDGRID_API_KEY);

  const email = {
      from: EMAIL_USER,
      to,
      subject,
      html
  }

  await sendGrid.send(email)
}

module.exports = {
  tryCatchWrapper,
  errorHandler,
  sendMail
};
