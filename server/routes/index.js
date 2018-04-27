const router = require('express').Router(),
  users = require('../controllers/userCtrl'),
  notes = require('../controllers/notesCtrl'),
  auth = require('./auth');
// USER ENDPOINTS
router.route('/users')
  .post(users.create);

router.route('/users/login')
  .post(users.login);

// routes below need user auth for accessibility

// Middleware for authentication
router.use(auth.authenticate);

router.route('/users/logout')
  .post(users.logout);

router.route('/users/:user_id')
  .put(users.update)
  .delete(users.delete);


// NOTES ENDPOINTS
router.route('/notes')
  .post(notes.create)
  .get(notes.getAll);

router.route('/notes/:note_id')
  .get(notes.getNote)
  .put(notes.update)
  .delete(notes.delete);


module.exports = router;