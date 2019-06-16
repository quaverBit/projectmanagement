class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.i18n = message;
    this.statusCode = 401;
  }
}

module.exports = UnauthorizedError;