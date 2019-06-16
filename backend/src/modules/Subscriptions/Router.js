const { Router } = require('express');
const subscriptionsController = require('./Controller');

class SubscriptionsRouter {
  constructor(){
    this.expressRouter = Router();
  
    // this.expressRouter.post('/verify', authController.verify);
  }
}

module.exports = new SubscriptionsRouter().expressRouter;