const chai = require('chai');
const sinonChai = require('sinon-chai');
const rewire = require('rewire');
const config = require('config');

const { expect } = chai;
const sinon = require('sinon');

chai.should();
chai.use(sinonChai);
const httpStatus = require('http-status');
const faker = require('faker');
const UserRepository = require('../../../../src/api/user/userRepository');
const { userDetails } = require('./userMockData');
const APIError = require('../../../../src/utils/APIError');

describe('User Service Test', () => {
  let logger;
  beforeEach(() => {
    logger = {
      info: sinon.spy(),
      error: sinon.spy(),
    };
    UserService = rewire('../../../../src/api/user/userService');
    UserService.__set__('logger', logger);
  });
  it('should get data', async () => {
    const stubValue = [
      {
        username: faker.name.findName(),
        password: faker.name.findName(),
        email: faker.internet.email(),
      },
    ];
    const userRepository = new UserRepository({});
    const stub = sinon.stub(userRepository, 'findAll').returns(stubValue);
    const userService = new UserService(userRepository);
    const user = await userService.getAllUsers();
    expect(stub.calledOnce).true;
    expect(user).to.equal(stubValue);
    // expect(actualResult).to.equal(expectedResult)
  });

  describe('get User By Email', () => {
    afterEach(() => sinon.restore());
    it('should return a user based on email', async () => {
      const email = "aa@gmail.com"

      UserService.__set__('logger', logger);
      const userRepository = new UserRepository({});
      const getUserByEmail = sinon
        .stub(userRepository, 'findUserByEmail')
        .returns(userDetails);
      const userService = new UserService(userRepository);
      const result = await userService.getUserByEmail(email);
      console.log(result);
      // expect(getUserByEmail).calledOnce;
      // expect(result).to.eql(userDetails);
      // expect(getUserByEmail()).an('Object');
    });

    it('should throw an API Error on call get User By Email method', async () => {
      const error = new APIError({
        status: httpStatus.NOT_FOUND,
      });
      // const res = {
      //   unmaskedData: {
      //     params: {
      //       id: 9,
      //     },
      //   },
      //   token: 'notAToken',
      // };
      const email = "aa@gmail.com"
      const userRepository = new UserRepository({});
      const getIndividualUserStub = sinon.stub(userRepository, 'findUserByEmail').throws(error);
      const userService = new UserService(userRepository);
      try {
        await userService.getUserByEmail(email);
      } catch (e) {
        expect(e instanceof APIError).true;
        expect(e.status).equal(httpStatus.NOT_FOUND);
        expect(e.message).to.undefined;
      }
      expect(logger.error).not.called;
      expect(logger.info).not.called;
      expect(getIndividualUserStub).calledOnce;
      expect(getIndividualUserStub).calledWith(email);
    });

    it('should call addUser method', async () => {
      const payload = {
        first_name: 'test',
        last_name:'test',
        email:'test@gmail.com',
        gender:'M'
      };
      const userRepository = new UserRepository({});
      const addUserSpy = sinon
        .stub(userRepository, 'createUser')
        .returns(userDetails);
      const userService = new UserService(userRepository);
      const result = await userService.addUser(payload);
      expect(addUserSpy).calledOnce;
      expect(addUserSpy).calledWith(payload);
      expect(result).eql(userDetails);
    });
  
    it('should throw an API Error on call addUser method', async () => {
      const error = new APIError({
        status: httpStatus.NOT_FOUND,
      });
      const payload = {
        first_name: 'test',
        last_name:'test',
        email:'test@gmail.com',
        gender:'M'
      };
      const userRepository = new UserRepository({});
      const addUserSpy = sinon.stub(userRepository, 'createUser').throws(error);
      const userService = new UserService(userRepository);
      try {
        await userService.addUser(payload);
      } catch (e) {
        expect(e instanceof APIError).true;
        expect(e.status).equal(httpStatus.NOT_FOUND);
        expect(e.message).to.undefined;
      }
      expect(logger.error).not.called;
      expect(logger.info).not.called;
      expect(addUserSpy).calledOnce;
      expect(addUserSpy).calledWith(payload);
    });
  
    // it('should throw an Error on call addUser method', async () => {
    //   // const error = new Error('Error');
    //   const error = new APIError({
    //     status: httpStatus.INTERNAL_SERVER_ERROR,
    //   });
    //   const payload = {
    //     id: '2',
    //     first_name: 'Adnan',
    //     last_name: 'Alkasir',
    //     email: 'aa@gmail.com',
    //     gender: 'M',
    //   };
      
    //   const userRepository = new UserRepository({});
    //   const addUserSpy = sinon.stub(userRepository, 'createUser').throws(error);
    //   const userService = new UserService(userRepository);
    //   try {
    //     await userService.addUser(payload);
    //   } catch (e) {
    //     expect(e instanceof APIError).true;
    //     expect(e.status).equal(httpStatus.INTERNAL_SERVER_ERROR);
    //     expect(e.message).to.undefined;
    //   }
    //   expect(logger.info).not.called;
    //   expect(logger.error).called;
    //   expect(logger.error).calledWith(sinon.match.any, error);
    //   // expect(addUserSpy).calledOnce;
    //   expect(addUserSpy).calledWith(payload);
    // });
  });


 
});
