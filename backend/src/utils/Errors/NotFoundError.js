class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.i18n = message;
    this.statusCode = 404;
  }
}

module.exports = NotFoundError;