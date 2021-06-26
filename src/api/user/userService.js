
const APIError = require('../../utils/APIError');
const logger = require('../../utils/logger');

class UserService {
    constructor(UserRepository) {
      this.userRepository = UserRepository;
    }

    getAllUsers = async () => {
        try {
            return await this.userRepository.findAll();
          } catch (error) {
            if (error instanceof APIError) {
              throw error;
            }
            logger.error('UserService:getAllUsers:error', error);
            throw new APIError({
              status: httpStatus.INTERNAL_SERVER_ERROR,
            });
          }
    }

    getUserByEmail = async (email) =>{
        try {
            return await this.userRepository.findUserByEmail(email);
          } catch (error) {
            if (error instanceof APIError) {
              throw error;
            }
            logger.error('UserService:getUserByEmail:error', error);
            throw new APIError({
              status: httpStatus.INTERNAL_SERVER_ERROR,
            });
          }
    }

    addUser = async (payload) => {
        try {
            return this.userRepository.createUser(payload);
          } catch (error) {
            if (error instanceof APIError) {
              throw error;
            }
            logger.error('UserService:addUser:error', error);
            throw new APIError({
              status: httpStatus.INTERNAL_SERVER_ERROR,
            });
          }
    }

}

module.exports = UserService;
