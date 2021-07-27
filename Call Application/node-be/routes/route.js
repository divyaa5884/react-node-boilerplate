const Router = require('express').Router();
const Controllers = require('./../controllers/controller')

Router.post('/connectCall', Controllers.userCreate, Controllers.logCreate);

module.exports = Router;