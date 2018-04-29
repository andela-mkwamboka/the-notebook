const jwt = require('jsonwebtoken');

module.exports = {
  authenticate: (request, response, next) => {
    // find token
    const token = request.body.token || request.query.token || request.headers['x-access-token'];
    if (token) {
      // Verify secret and check expires time
      jwt.verify(token, process.env.SUPERSECRET, (error, decoded) => {
        if (error) {
          return response.status(403).json({
            message: 'Access Denied',
            error: error,
          });
        } else {
          // Save token on request for  use in routes
          request.decoded = decoded;
          next();
        }
      });
    } else {
      return response.status(403).json({
        message: 'No token found',
      });
    }
  },
  // middleware that modify the response body
  modifyBody: (request, response) => {
    response.setHeader('Content-Type', 'text/html');
    response.end();
  }

};