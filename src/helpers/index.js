const { NodejsHomeworkError } = require("./errors");
const sgMail = require('@sendgrid/mail');

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

const sendMail = async({to, subject, html}) => {
  const {SENDGRID_API_KEY, EMAIL_USER} = process.env
  sgMail.setApiKey(SENDGRID_API_KEY);
 

const msg = {
  to,
  from: EMAIL_USER,
  subject,
  html,
};

sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent');
  })
  .catch(error => {
    console.error(error);
  });
}

module.exports = {
  tryCatchWrapper,
  errorHandler,
  sendMail
};
