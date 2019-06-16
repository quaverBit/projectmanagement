const fs = require('fs');
const path = require('path');
const express = require('express');
class Module {
  constructor(uri, source) {
    console.log(`Loading /${uri}`);
    if(fs.existsSync(path.join(source,'Router.js'))) {
      this.expressRouter = require(path.join(source, 'Router.js'));
    } else {
      console.warn('going commando!')
      this.expressRouter = express.Router();
    }    
    this.uri = uri;
    console.log(`Loaded /${uri}`);
  }
}

module.exports = Module;