const authValidation = require('./AuthValidation');
const { model: User } = require('./UserModel')
const { ForbiddenError } = require('../../utils/Errors');

class AuthController {
  constructor() {

  }
  async signup (req, res, next) {
    const { username, password } = req.body;
    try {
      const user = await User.create({ username, password });
      return res.json({
        data: {
          token: user.signToken(),
        }
      })
    } catch (ex) {
      next(ex);
    }
  }

  async login(req, res, next) {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ username });
      if(!user) {
        return next(new ForbiddenError('error.forbidden.invalid-credentials'));
      }
      user.comparePassword(password, (err, match) => {
        if (err) {
          return next(new ForbiddenError('error.forbidden.invalid-credentials'));
        } else {
          if (match) {
            res.json({
              data: {
                token: user.signToken(),
              }
            })
          } else {
            return next(new ForbiddenError('error.forbidden.invalid-credentials'));
          }
        }
      });
    } catch (ex) {
      next(ex);
    }
  }
};

const authCtrl = new AuthController();

module.exports = {
  signup: [authValidation.signup, authCtrl.signup],
  login: [authValidation.login, authCtrl.login],
}
