const { Router } = require('express');
const authController = require('./Controller');

class AuthRouter {
  constructor(){
    this.expressRouter = Router();
    
    this.expressRouter.post('/', authController.signup);
    this.expressRouter.post('/login', authController.login);
    // this.expressRouter.post('/verify', authController.verify);
  }
}

module.exports = new AuthRouter().expressRouter;