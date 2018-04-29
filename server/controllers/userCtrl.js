const User = require('../models/user.js'),
  jwt = require('jsonwebtoken');

module.exports = {
  create: (request, response) => {
    const user = new User();

    // Set user info from request
    user.username = request.body.username;
    user.email = request.body.email;
    user.password = request.body.password;

    user.save((error, user) => {
      if (error) {
        if (error.code === 11000) {
          response.status(400).json({
            message: 'Duplicate Entry'
          });
        } else {
          response.status(500).json({
            error: error
          });
        }
      } else {
        response.json(user);
      }

    });
  },

  login: (request, response) => {
    User.findOne({
      username: request.body.username
    }, (error, user) => {
      if (user) {
        response.status(200).send({
          message: 'Login successful',
          user: user
        });
      } else {
        response.status(401).send({
          error: error
        });
      }
    });
  },

  update: (request, response) => {
    User.findById({
      _id: request.params.user_id
    }, (error, user) => {
      // update user details they are new
      if (request.body.username) user.username = request.body.username;
      if (request.body.email) user.email = request.body.email;
      if (request.body.password) user.password = request.body.password;
      if (error) {
        return response.status(400).send({
          error: error
        });
      } else {
        // save the new user details
        user.save((error, user) => {
          response.status(200).send({
            message: 'user details updated',
            user: user
          });
        });
      }
    });
  },

  delete: (request, response) => {
    User.remove({
      _id: request.params.user_id
    }, (error) => {
      if (error) {
        return response.status(409).send({
          message: error
        });
      } else {
        response.status(202).send({
          message: 'Sad to see you leave'
        });
      }
    });
  },

  logout: (request, response) => {
    if (request.decoded) {
      delete request.decoded;
      response.json({
        message: 'Bye',
      });
    }
  },
};