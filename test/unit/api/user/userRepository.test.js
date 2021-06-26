// const chai = require('chai');
// const sinonChai = require('sinon-chai');

// const { expect } = chai;
// const sinon = require('sinon');
// const rewire = require('rewire');

// const faker = require("faker");
// const { UserModel } = require("../../../../src/api/user/userModel");

// chai.should();
// chai.use(sinonChai);

// const httpStatus = require('http-status');
// // const proxyquire = require('proxyquire');
// const APIError = require('../../../../src/utils/APIError');
// const {
//   services,
//   servicesFormatted,
//   userDetails,
//   userDetailsJsonMask,
// } = require('./userMockData');

// describe('User Repository Test', () => {
//   const stubValue = {
//     id: faker.random.uuid(),
//     name: faker.name.findName(),
//     email: faker.internet.email(),
//     createdAt: faker.date.past(),
//     updatedAt: faker.date.past()
//   };
//   let UserRepository;
//   let logger;
//   beforeEach(() => {
//     logger = {
//       info: sinon.spy(),
//       error: sinon.spy(),
//     };
//     UserRepository = rewire('../../../../src/api/user/userRepository.js');
//     UserRepository.__set__('logger', logger);
//   });

//   afterEach(() => sinon.restore());

//   describe('Fetch user by email', () => {
//     it('Should return user details for correct email from DB', async () => {
//       const pgQuery = {
//         exec: sinon.stub().returns({ rowCount: 1, rows: [{ user: 'user' }] }),
//       };
//       const userRepo = new UserRepository(pgQuery);
//       const userName = 'shearera@cromwell.co.uk';
//       const platformId = 1;
//       const result = await userRepo.findUserByEmailAndPlatformId(
//         userName,
//         platformId,
//       );
//       expect(result).an('object');
//     });

//     it('Should return null for wrong username', async () => {
//       const pgQuery = {
//         exec: sinon.stub().returns({ rowCount: 0, rows: null }),
//       };
//       const userRepo = new UserRepository(pgQuery);
//       const userName = 'rahul@cromwell.co.uk';
//       const platformId = 1;
//       const result = await userRepo.findUserByEmailAndPlatformId(
//         userName,
//         platformId,
//       );
//       expect(result).a('null');
//     });

//     it('should throw an error', async () => {
//       const error = new Error('Error');
//       const pgQuery = {
//         exec: sinon.stub().throws(error),
//       };
//       const userRepo = new UserRepository(pgQuery);
//       const userName = 'rahul@cromwell.co.uk';
//       const platformId = 1;
//       try {
//         await userRepo.findUserByEmailAndPlatformId(userName, platformId);
//       } catch (e) {
//         expect(e instanceof APIError).true;
//         expect(e.status).equal(httpStatus.INTERNAL_SERVER_ERROR);
//         expect(e.message).to.undefined;
//       }
//       expect(logger.error).calledOnce;
//       expect(logger.error).calledWithExactly(sinon.match.any, error);
//     });
//   });

  

//   describe('Find user by platform', () => {
//     it('should return a list of users by platform', async () => {
//       const pgQuery = {
//         prepare: sinon.stub().returns({
//           preparedSql: 'preparedSql',
//           preparedParams: 'preparedParams',
//         }),
//         exec: sinon.stub().returns({
//           rowCount: 1,
//           rows: [
//             {
//               json: [userDetails],
//               numberOfRecords: '1',
//             },
//           ],
//         }),
//       };
//       const userRepo = new UserRepository(pgQuery);
//       const findUsersByPlatformStub = sinon.spy(
//         userRepo,
//         'findUsersByPlatform',
//       );
//       const token = 'fakeToken';
//       const queries = {
//         platformId: 2,
//         pageNo: 1,
//         firstname: 'Nitin',
//         surname: 'Vaja',
//         userEmail: 'vajan@cromwell.co.uk',
//         userActive: true,
//       };
//       const pageLimitConfig = { configuration_value: 25 };
//       await userRepo.findUsersByPlatform(token, queries, pageLimitConfig);

//       expect(findUsersByPlatformStub).calledOnce;
//       expect(pgQuery.prepare).calledOnce;
//       expect(pgQuery.prepare).calledWithExactly(sinon.match.any, {
//         platformId: queries.platformId,
//         startFrom: 0,
//         limit: pageLimitConfig.configuration_value,
//         sqlVars: true,
//       });
//       expect(pgQuery.exec).calledOnce;
//       expect(pgQuery.exec).calledWithExactly(
//         'preparedSql',
//         'preparedParams',
//         [],
//         [],
//         [],
//         token,
//         userDetailsJsonMask,
//       );
//       expect(paginationSpy).calledOnce;
//     });

//     it('should throw an error', async () => {
//       const pgQuery = {
//         exec: sinon.stub().throws(new Error()),
//       };

//       const userRepo = new UserRepository(pgQuery);

//       const token = 'fakeToken';
//       const queries = {
//         platformKey: 'b2m-web',
//         pageNo: 1,
//         firstname: 'Nitin',
//         surname: 'Vaja',
//         userEmail: 'vajan@cromwell.co.uk',
//         userActive: true,
//       };
//       const pageLimitConfig = { configuration_value: 25 };
//       try {
//         await userRepo.findUsersByPlatform(token, queries, pageLimitConfig);
//       } catch (error) {
//         expect(error instanceof APIError).true;
//         expect(error.status).equal(httpStatus.INTERNAL_SERVER_ERROR);
//         expect(error.message).undefined;
//       }
//       expect(logger.error).calledOnce;
//       expect(logger.error).calledWith(sinon.match.any);
//     });
//   });

 
//   describe('For adding new users', () => {
//     it('Should return false if user does not exists for platform', async () => {
//       const userEmail = 'test@test.com';
//       const platformId = 1;
//       const pgQuery = {
//         prepare: sinon.stub().returns({
//           preparedSql: 'preparedSql',
//           preparedParams: 'preparedParams',
//         }),
//         exec: sinon
//           .stub()
//           .returns({ rowCount: 0, rows: [{ userEmail: 'test@test.com' }] }),
//       };
//       const userRepo = new UserRepository(pgQuery);
//       const result = await userRepo.checkUserExistsForPlatform(
//         userEmail,
//         platformId,
//       );
//       expect(result).false;
//       expect(pgQuery.prepare).calledOnce;
//       expect(pgQuery.prepare).calledWith(sinon.match.any, {
//         userEmail,
//         platformId,
//       });
//       expect(pgQuery.exec).calledOnce;
//       expect(pgQuery.exec).calledWith('preparedSql', 'preparedParams');
//     });

//     it('Should throw an error if user exists for platform', async () => {
//       const userEmail = 'test@test.com';
//       const platformId = 1;
//       const pgQuery = {
//         prepare: sinon.stub().returns({
//           preparedSql: 'preparedSql',
//           preparedParams: 'preparedParams',
//         }),
//         exec: sinon
//           .stub()
//           .returns({ rowCount: 1, rows: [{ userEmail: 'test@test.com' }] }),
//       };
//       const userRepo = new UserRepository(pgQuery);
//       try {
//         await userRepo.checkUserExistsForPlatform(userEmail, platformId);
//       } catch (error) {
//         expect(error instanceof APIError).true;
//         expect(error.status).equal(httpStatus.CONFLICT);
//         expect(error.message).undefined;
//       }
//       expect(formatErrorsSpy).calledOnce;
//       expect(formatErrorsSpy).calledWith(
//         { userEmail: 'test@test.com' },
//         'already taken',
//       );
//       expect(pgQuery.prepare).calledOnce;
//       expect(pgQuery.prepare).calledWith(sinon.match.any, {
//         userEmail,
//         platformId,
//       });
//       expect(pgQuery.exec).calledOnce;
//       expect(pgQuery.exec).calledWith('preparedSql', 'preparedParams');
//       expect(logger.error).not.called;
//       expect(logger.info).calledOnce;
//       expect(logger.info).calledWith(sinon.match.any);
//     });

//     it('should insert the user details and return id ', async () => {
//       const payload = {
//         userEmail: 'Test@Test.com',
//         userPassword: 'hashedPassword',
//         firstName: 'firstName',
//         surname: 'surname',
//         platformId: 1,
//       };
//       const res = [{ id: 1 }];
//       const pgQuery = {
//         prepare: sinon.stub().returns({
//           preparedSql: 'preparedSql',
//           preparedParams: 'preparedParams',
//         }),
//         exec: sinon.stub().returns({ rowCount: 1, rows: res }),
//       };
//       const userRepo = new UserRepository(pgQuery);
//       const results = await userRepo.createNewUser(payload);
//       expect(results).to.eql(res[0]);
//       expect(hashPasswordSpy).calledOnce;
//       expect(hashPasswordSpy).calledWith(payload.userPassword);
//       expect(pgQuery.prepare).calledOnce;
//       payload.userEmail = 'test@test.com';
//       expect(pgQuery.prepare).calledWith(sinon.match.any, {
//         userEmail: payload.userEmail,
//         newBcryptPass: payload.userPassword,
//         firstName: payload.firstName,
//         surname: payload.surname,
//         platformId: payload.platformId,
//       });
//       expect(pgQuery.exec).calledOnce;
//       expect(pgQuery.exec).calledWith('preparedSql', 'preparedParams');
//     });

//     it('should throw an error if insert the user details rowCount is 0', async () => {
//       const payload = {
//         userEmail: 'Test@Test.com',
//         userPassword: 'hashedPassword',
//         firstName: 'firstName',
//         surname: 'surname',
//         platformId: 1,
//       };
//       const res = [{ id: 1 }];
//       const pgQuery = {
//         prepare: sinon.stub().returns({
//           preparedSql: 'preparedSql',
//           preparedParams: 'preparedParams',
//         }),
//         exec: sinon.stub().returns({ rowCount: 0, rows: res }),
//       };
//       const userRepo = new UserRepository(pgQuery);
//       try {
//         await userRepo.createNewUser(payload);
//       } catch (error) {
//         expect(error instanceof APIError).true;
//         expect(error.status).equal(httpStatus.NOT_IMPLEMENTED);
//         expect(error.message).undefined;
//       }
//       expect(hashPasswordSpy).calledOnce;
//       expect(hashPasswordSpy).calledWith(payload.userPassword);
//       expect(pgQuery.prepare).calledOnce;
//       payload.userEmail = 'test@test.com';
//       expect(pgQuery.prepare).calledWith(sinon.match.any, {
//         userEmail: payload.userEmail,
//         newBcryptPass: payload.userPassword,
//         firstName: payload.firstName,
//         surname: payload.surname,
//         platformId: payload.platformId,
//       });
//       expect(pgQuery.exec).calledOnce;
//       expect(pgQuery.exec).calledWith('preparedSql', 'preparedParams');
//       expect(logger.error).not.called;
//       expect(logger.info).calledOnce;
//       expect(logger.info).calledWith(sinon.match.any);
//     });
//   });

//   describe('getIndividualUser', () => {
//     it('should return a user based on Email', async () => {
//       const pgQuery = {
//         prepare: sinon.stub().returns({
//           preparedSql: 'preparedSql',
//           preparedParams: 'preparedParams',
//         }),
//         exec: sinon.stub().returns({ rowCount: 1, rows: userDetails }),
//       };
//       const token = 'fakeToken';
//       const id = 9;
//       const userRepo = new UserRepository(pgQuery, {});
//       const getIndividualUserStub = sinon.spy(userRepo, 'getIndividualUser');
//       await userRepo.getIndividualUser(token, id);

//       expect(getIndividualUserStub).calledOnce;
//       expect(pgQuery.prepare).calledOnce;
//       expect(pgQuery.prepare).calledWithExactly(sinon.match.any, {
//         id,
//       });
//       expect(pgQuery.exec).calledOnce;
//       expect(pgQuery.exec).calledWithExactly(
//         'preparedSql',
//         'preparedParams',
//         [],
//         [],
//         [],
//         token,
//         jsonMask,
//       );
//     });

//     it('should throw an error', async () => {
//       const pgQuery = {
//         exec: sinon.stub().throws(new Error()),
//       };

//       const token = 'fakeToken';
//       const id = 9;
//       const userRepo = new UserRepository(pgQuery, {});
//       try {
//         await userRepo.getIndividualUser(token, id);
//       } catch (error) {
//         expect(error instanceof APIError).true;
//         expect(error.status).equal(httpStatus.INTERNAL_SERVER_ERROR);
//         expect(error.message).undefined;
//       }
//       expect(logger.error).calledOnce;
//       expect(logger.error).calledWith(sinon.match.any);
//     });
//   });
  

//   describe('addUser', () => {
//     it('Should call addUser method', async () => {
//       const token = 'TOKEN123';
//       const reqUser = {
//         userEmail: 'Nitin.Patel@cromwell.co.uk',
//         firstName: 'Nitin',
//         surname: 'Patel',
//         platformId: '1',
//         roles: [2],
//       };
//       const platformsRepositorySpy = {
//         checkPlatformIdExists: sinon.stub().returns(),
//       };
//       const rolesRepositorySpy = {
//         checkRolesExists: sinon.stub().returns(),
//       };
//       const usersRolesRepository = {
//         insertUsersRoles: sinon.stub().returns(),
//       };
//       const id = 10;
//       const userRepository = new UserRepository(
//         undefined,
//         platformsRepositorySpy,
//         rolesRepositorySpy,
//         usersRolesRepository,
//       );
//       const checkUserExistsForPlatformSpy = sinon.stub(
//         userRepository,
//         'checkUserExistsForPlatform',
//       );
//       const createNewUserSpy = sinon
//         .stub(userRepository, 'createNewUser')
//         .returns({ id });
//       const getIndividualUserSpy = sinon
//         .stub(userRepository, 'getIndividualUser')
//         .returns(userDetails);

//       const results = await userRepository.addUser(reqUser, token);

//       expect(platformsRepositorySpy.checkPlatformIdExists).calledOnce;
//       expect(platformsRepositorySpy.checkPlatformIdExists).calledWithExactly(
//         reqUser.platformId,
//       );
//       expect(checkUserExistsForPlatformSpy).calledOnce;
//       expect(checkUserExistsForPlatformSpy).calledWithExactly(
//         reqUser.userEmail.toLowerCase(),
//         reqUser.platformId,
//       );
//       expect(rolesRepositorySpy.checkRolesExists).calledOnce;
//       expect(rolesRepositorySpy.checkRolesExists).calledWithExactly(
//         reqUser.roles,
//       );
//       expect(createNewUserSpy).calledOnce;
//       expect(createNewUserSpy).calledWithExactly(reqUser);
//       expect(usersRolesRepository.insertUsersRoles).calledOnce;
//       expect(usersRolesRepository.insertUsersRoles).calledWithExactly(
//         id,
//         reqUser.roles,
//       );
//       expect(getIndividualUserSpy).calledOnce;
//       expect(getIndividualUserSpy).calledWithExactly(token, id);
//       expect(results).equal(userDetails);
//     });

//     it('Should throw an API Error on addUser method', async () => {
//       const error = new APIError({
//         status: httpStatus.NOT_FOUND,
//       });
//       const token = 'TOKEN123';
//       const reqUser = {
//         userEmail: 'Nitin.Patel@cromwell.co.uk',
//         firstName: 'Nitin',
//         surname: 'Patel',
//         platformId: '1',
//         roles: [2],
//       };
//       const platformsRepositorySpy = {
//         checkPlatformIdExists: sinon.stub().throws(error),
//       };
//       const rolesRepositorySpy = {
//         checkRolesExists: sinon.stub().returns(),
//       };
//       const usersRolesRepository = {
//         insertUsersRoles: sinon.stub().returns(),
//       };
//       const id = 10;
//       const userRepository = new UserRepository(
//         undefined,
//         platformsRepositorySpy,
//         rolesRepositorySpy,
//         usersRolesRepository,
//       );
//       const checkUserExistsForPlatformSpy = sinon.stub(
//         userRepository,
//         'checkUserExistsForPlatform',
//       );
//       const createNewUserSpy = sinon
//         .stub(userRepository, 'createNewUser')
//         .returns({ id });
//       const getIndividualUserSpy = sinon
//         .stub(userRepository, 'getIndividualUser')
//         .returns(userDetails);
//       try {
//         await userRepository.addUser(reqUser, token);
//       } catch (e) {
//         expect(e instanceof APIError).true;
//         expect(e.status).equal(httpStatus.NOT_FOUND);
//         expect(e.message).to.undefined;
//       }
//       expect(platformsRepositorySpy.checkPlatformIdExists).calledOnce;
//       expect(platformsRepositorySpy.checkPlatformIdExists).calledWithExactly(
//         reqUser.platformId,
//       );
//       expect(checkUserExistsForPlatformSpy).not.called;
//       expect(rolesRepositorySpy.checkRolesExists).not.called;
//       expect(createNewUserSpy).not.called;
//       expect(usersRolesRepository.insertUsersRoles).not.called;
//       expect(getIndividualUserSpy).not.called;
//       expect(logger.error).not.called;
//       expect(logger.info).not.called;
//     });

//     it('Should throw an Error on addUser method', async () => {
//       const error = new Error('Error');
//       const token = 'TOKEN123';
//       const reqUser = {
//         userEmail: 'Nitin.Patel@cromwell.co.uk',
//         firstName: 'Nitin',
//         surname: 'Patel',
//         platformId: '1',
//         roles: [2],
//       };
//       const platformsRepositorySpy = {
//         checkPlatformIdExists: sinon.stub().throws(error),
//       };
//       const rolesRepositorySpy = {
//         checkRolesExists: sinon.stub().returns(),
//       };
//       const usersRolesRepository = {
//         insertUsersRoles: sinon.stub().returns(),
//       };
//       const id = 10;
//       const userRepository = new UserRepository(
//         undefined,
//         platformsRepositorySpy,
//         rolesRepositorySpy,
//         usersRolesRepository,
//       );
//       const checkUserExistsForPlatformSpy = sinon.stub(
//         userRepository,
//         'checkUserExistsForPlatform',
//       );
//       const createNewUserSpy = sinon
//         .stub(userRepository, 'createNewUser')
//         .returns({ id });
//       const getIndividualUserSpy = sinon
//         .stub(userRepository, 'getIndividualUser')
//         .returns(userDetails);
//       try {
//         await userRepository.addUser(reqUser, token);
//       } catch (e) {
//         expect(e instanceof APIError).true;
//         expect(e.status).equal(httpStatus.INTERNAL_SERVER_ERROR);
//         expect(e.message).to.undefined;
//       }
//       expect(platformsRepositorySpy.checkPlatformIdExists).calledOnce;
//       expect(platformsRepositorySpy.checkPlatformIdExists).calledWithExactly(
//         reqUser.platformId,
//       );
//       expect(checkUserExistsForPlatformSpy).not.called;
//       expect(rolesRepositorySpy.checkRolesExists).not.called;
//       expect(createNewUserSpy).not.called;
//       expect(usersRolesRepository.insertUsersRoles).not.called;
//       expect(getIndividualUserSpy).not.called;
//       expect(logger.info).not.called;
//       expect(logger.error).calledOnce;
//       expect(logger.error).calledWith(sinon.match.any);
//     });
//   });
// });
