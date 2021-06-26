const User = require("../model/User");

module.exports = (server) => {
  // get  all user
  server.get("/user", async (req, res) => {
    try {
      const users = await User.find({});
      res.send(users);
    } catch (err) {
      console.log(err);
    }
  });

  // get one user

  server.get("/user/:id", async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      res.send(user);
    } catch (err) {
      console.log(`There is no User with the id of ${req.params.id}`);
    }
  });

  //Add User

  server.post("/user", async (req, res) => {
    if (!req.is("application/json")) {
      console.log("Expect 'application/json'");
    } else {
      const { first_name, last_name, email, gender } = req.body;
      const user = new User({
        first_name,
        last_name,
        email,
        gender,
      });
      try {
        const newUser = await user.save();
        res.sendStatus(201);
      } catch (err) {
        console.log("Error is ", err.message);
      }
    }
  });
};
