// Why not?!
class TeaPotError extends Error {
  constructor(message) {
    super(message);
    this.i18n = message;
    this.statusCode = 418;
  }
}

module.exports = TeaPotError;