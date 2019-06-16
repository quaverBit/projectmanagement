class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.i18n = message;
    this.statusCode = 403;
  }
}

module.exports = ForbiddenError;