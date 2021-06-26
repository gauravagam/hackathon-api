const { container } = require('../../modules/bottle');
module.exports = (app) => {
    app.get(
    '/v1/user',
      container.UserController.getUser,
    );

    app.get(
        '/v1/users',
          container.UserController.getUsers,
        );

        
    app.post(
        '/v1/user/:email',
        container.UserController.createUser,
    )
}