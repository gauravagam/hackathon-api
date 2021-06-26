const UserService = require('./userService');
const UserController = require('./userController');
const UserRepository = require('./userRepository');

module.exports = (bottle) => {
    bottle.service(
      'UserRepository',
      UserRepository,
    );
    bottle.service(
      'UserService',
      UserService,
      'UserRepository',
    );
    bottle.service(
      'UserController',
      UserController,
      'UserService',
    );
    return bottle;
  };
  