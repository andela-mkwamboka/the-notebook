const router = require('express').Router();
const users = require('../controllers/userCtrl');

// USER ENDPOINTS
router.route('/users')
  .post(users.create);

// router.route('/users/:user_id')
//   .get(users.getUser)
//   .put(users.update)
//   .delete(users.delete);

// router.route('/users/login')
//   .post(users.login);

// router.route('/users/logout')
//   .post(users.logout);

module.exports = router;