const { Module } = require('../../utils/Carlota');

/**
 * This was left here for example porposes
 * class Auth extends Module {
 *  constructor(uri) {
 *    super(uri, __dirname);
 *    this.expressRouter = express.Router();
 *    this.expressRouter.use(...)
 *  }
 * }
 * 
 * 
 * 
 */


module.exports = new Module('auth',__dirname);