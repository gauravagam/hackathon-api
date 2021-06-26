const User = require("./userModel");
const logger = require('../../utils/logger');
const APIError = require('../../utils/APIError');
class UserRepository {
  findAll = async () => {
    try {
        const result = await User.find({})
      return result;
    } catch (error) {
        logger.error('UserRepository:findAll:error', error);
        throw new APIError({
          status: httpStatus.INTERNAL_SERVER_ERROR,
        });
      }
  };

  findUserByEmail = async (email) => {
    try {
      return await User.findById(req.params.id);
    } catch (error) {
        logger.error('UserRepository:findUserByEmail:error', error);
        throw new APIError({
          status: httpStatus.INTERNAL_SERVER_ERROR,
        });
      }
  };

  createUser = async (payload) => {
    const { first_name, last_name, email, gender } = payload;
    try {
      const user = new User({
        first_name,
        last_name,
        email,
        gender,
      });
      return await user.save();
    }catch (error) {
        if (error instanceof APIError) {
          throw error;
        }
        logger.error('UserRepository:createUser:error', error);
        throw new APIError({
          status: httpStatus.INTERNAL_SERVER_ERROR,
        });
      }
  };
}

module.exports = UserRepository;
