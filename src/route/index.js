const userRoutes = require('../api/user/userRoutes');

module.exports = (app) => {
  userRoutes(app);
  return app;
};
