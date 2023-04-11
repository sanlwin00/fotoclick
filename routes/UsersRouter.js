const express=require('express');
const bodyParser = require('body-parser');
const userController = require('../controllers/UsersController');

const UsersRouter = express.Router();

UsersRouter.use(bodyParser.urlencoded());

UsersRouter.route('/login')
    .post(userController.validateUser);

UsersRouter.route('/signup')
    .post(userController.createUser);

module.exports = UsersRouter;