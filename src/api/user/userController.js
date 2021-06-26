const httpStatus = require("http-status");
class UserController {
  constructor(UserService, redisCon) {
    this.userService = UserService;
    this.redis = redisCon;
  }

  getUsers = async (req, res,next) => {
    try {
      const data = await this.userService.findUsers();
      res.json(data);
    } catch (error) {
      logger.error(error);
      next(error);
    }
  };

  createUser = async (req, res, next) => {
    try {
      const data = await this.userService.addUser(payload);
      res.status(httpStatus.CREATED);
      res.json(data);
    } catch (error) {
      next(error);
    }
  };

  getUser = async (req, res,next) => {
    try {
      const { email } = req.params;
      const data = await this.userService.findUserByEmail(email);
      res.json(data);
    } catch (error) {
      logger.error(error);
      next(error);
    }
  };
}
module.exports = UserController;
