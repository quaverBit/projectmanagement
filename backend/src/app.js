const path = require('path');
const fs = require('fs');
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');
const expressValidator = require('express-validator');
const { Module } = require('./utils/Carlota');
const { env } = process;

class App {
  constructor(apiVersion) {
    const app = express();
    // Server generic middleware
    app.use(this.allowCrossDomain);
    app.use(helmet());
    app.use(express.json());
    app.use(bodyParser({extended: true}));
    app.use(expressValidator());

    // Fetch all app modules
    const modules = fs.readdirSync(path.join(__dirname, 'modules'))
      .filter(source => 
        fs
        .lstatSync(path.join(__dirname,'modules',source)).isDirectory())
        .map(source => path.join(__dirname, 'modules', source));
    modules.forEach((mod) => {
      const tempMod = require(mod);
      if(tempMod instanceof Module) {
        app.use(`/api/${apiVersion}/${tempMod.uri}`, tempMod.expressRouter);
      }
    });

    // Error Handler
    app.use((error, req, res, next) => {
      const statusCode = error.statusCode || 500;
      res.status(statusCode).json(error);
    })

    // Start server
    app.listen(env.PORT, () => {
      console.log("Ready to rumble on:", env.PORT);
    });

    
    
  }
  allowCrossDomain(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // allow requests from any other server
    res.header('Access-Control-Allow-Methods', 'GET,PATCH,POST,DELETE'); // allow these verbs
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Cache-Control");
  }
}

module.exports = new App(1);