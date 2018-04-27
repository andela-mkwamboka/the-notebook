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
          response.status(404).json({
            message: 'Duplicate Entry'
          });
        } else {
          response.status(500).json({
            error: error
          });
        }
      }
      // Create token
      const token = jwt.sign(user.toJSON(), process.env.SUPERSECRET, {
        expiresIn: 60 * 60 * 24, // 24 hours
      });
      response.status(200).json({
        message: 'User created',
        token: token,
        user: user
      });
    });
  },

  login: (request, response) => {
    User.findOne({
      username: request.body.username
    }).select('username password').exec((error, user) => {
      if (user) {
        const validPassword = user.comparePassword(request.body.password);
        if (!validPassword) {
          response.status(404).json({ message: 'Authentication failed. Wrong password.' });
        } else {
          // create token
          const token = jwt.sign({
            name: user.username,
          }, process.env.SUPERSECRET, {
            expiresIn: 60 * 60 * 24, // 24 hours
          });
          response.status(200).json({
            message: 'Login successful',
            user: user,
            token: token
          });
        }
      } else {
        response.status(401).json({
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
        return response.status(400).json({
          error: error
        });
      } else {
        // save the new user details
        user.save((error, user) => {
          response.status(200).json({
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
        return response.status(409).json({
          message: error
        });
      } else {
        response.status(202).json({
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