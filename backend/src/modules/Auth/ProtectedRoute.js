const { UnauthorizedError } = require('../../utils/Errors');
const { model: User} = require('./UserModel');

const securityMiddleware = async (req, res, next) => {
  let token;
  try {
    // header format: "Bearer token"
    token = req.headers.authorization.split(' ')[1];
  } catch (ex) {
    return next(new UnauthorizedError('error.jwt-bad-format'))
  }
  User.findFromToken(token, (err, user) => {
    if (err) return next(err);
    if (!user) return next(new UnauthorizedError('error.unauthorized'));
    req.user = user;
    next();
  });
};

const ProtectedRoute = (middleware) => {
  return middleware ? [
    securityMiddleware,
    middleware,
  ] : securityMiddleware;
}

module.exports = ProtectedRoute;
