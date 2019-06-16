const { checkSchema } = require('express-validator/check');
const { BadRequestError } = require('../Errors')

const customCheckSchema = (schema) => (
  (req, res, next) => {
    req.check(schema);
    const errors = req.validationErrors();
    if(errors) {
      next(new BadRequestError("error.invalid-fields", errors));
    } else {
      next();
    }
  }
);

module.exports = customCheckSchema;
