const Joi = require("joi");
const { ValidationError } = require("../../../helpers/errors");

const userValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "ua"] },
      })
      .required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return next(new ValidationError(error.message));
  }

  next();
};

module.exports = {userValidation};
