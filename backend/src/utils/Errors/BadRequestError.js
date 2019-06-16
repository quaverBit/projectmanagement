class BadRequestError extends Error {
  constructor(message, validationErrors) {
    super(message);
    this.i18n = message;
    this.statusCode = 400;
    this.validationErrors = validationErrors
  }
}

module.exports = BadRequestError;