const User = require('../models/user.js');

module.exports = {
  create: (request, response) => {
    const user = new User();

    // Set user info from request
    user.username = request.body.username;
    user.email = request.body.email;
    user.password = request.body.password;

    user.save((err, user) => {
      console.log(user, '------');
      if (err) {
        if (err.code === 11000) {
          response.status(400).send({
            message: 'Duplicate Entry'
          });
        } else {
          response.status(500).send({
            message: 'Error occured while saving user',
            err
          });
        }
      } else {
        response.send(user);
      }
    });
  },
};