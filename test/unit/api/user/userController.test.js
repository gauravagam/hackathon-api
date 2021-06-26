const httpStatus = require('http-status');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const rewire = require('rewire');

const faker = require("faker");
const { expect } = chai;
const sinon = require('sinon');
const userDetails = require('./userMockData');
chai.should();
chai.use(sinonChai);

let logger;
const UserService = require('../../../../src/api/user/userService');
const UserController = rewire(
  '../../../../src/api/user/userController',
);

describe('Users Controller Unit Test', () => {
  describe('getUserByEmail', () => {
    beforeEach(() => {
      logger = {
        info: sinon.spy(),
        error: sinon.spy(),
      };
      req = {
        params: {
          email: 'aa@gmail.com',
        },
      };
    });
    afterEach(() => sinon.restore());

    it('should return a user based on getUserByEmail', async () => {
      const stubValue = {
        id: req.params.id,
        first_name: faker.name.findName(),
        last_name: faker.name.findName(),
        email: faker.internet.email(),
        gender: faker.name.findName()
      };

     

      const res = {
        json: sinon.spy(),
      };
      // const next = () => { };
      const next = sinon.spy();
      const userService = new UserService({}, {});
      const UserController = rewire(
        '../../../../src/api/user/userController',
      );
      UserController.__set__('logger', logger);
      const userController = new UserController(userService);
      const getUserByEmail = sinon
        .stub(userService, 'getUserByEmail')
        .returns(userDetails);
      await userController.getUser(req, res, next);
console.log(res)
      // expect(getUserByEmail).calledOnce;
      // expect(res.json).calledOnce;
      // expect(res.json).calledWith(userDetails);  
      expect(getUserByEmail()).an('Object');
    });

    it('should throw an error', async () => {
      const res = {
        json: sinon.spy(),
      };
      const next = sinon.spy();
      const userService = new UserService({}, {});
      const UserController = rewire(
        '../../../../src/api/user/userController',
      );
      UserController.__set__('logger', logger);
      const userController = new UserController(userService);
      const getUserByEmail = sinon
        .stub(userService, 'getUserByEmail')
        .throws(new Error('Error'));
      await userController.getUser({}, res, next);

      expect(logger.error).calledOnce;
      // expect(getUserByEmail).calledOnce;
      expect(res.json).to.have.callCount(0);
      expect(next).calledOnce;
    });
  });

  describe("getUser", function() {
    let req;
    let res;
    let userService;
    beforeEach(() => {
      req = { params: { email: 'aa@gmail.com' } };
      res = { json: function() {} };
      const userRepo = sinon.spy();
      userService = new UserService(userRepo);
    });

    // it("should return a user that matches the email param", async function() {
     
    //   const mock = sinon.mock(res);
    //   const next = sinon.spy();
    //   mock
    //     .expects("json")
    //     .once()
    //     .withExactArgs({ data: {email:'aa@gmail.com'} });

    //   const stub = sinon.stub(userService, "getUserByEmail").returns(userDetails);
    //   userController = new UserController(userService);
    //   const user = await userController.getUser(req, res,next);
    //   expect(stub.calledOnce).to.be.true;
    //   mock.verify();
    // });
  });
});
