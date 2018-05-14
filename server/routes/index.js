const router = require('express').Router(),
  users = require('../controllers/userCtrl'),
  notes = require('../controllers/notesCtrl'),
  auth = require('./auth');

// USER ENDPOINTS
router.route('/users')
  .post(users.create);

router.route('/users/login')
  .post(users.login);

// Middleware for authentication
router.use(auth.authenticate);
// routes below need user auth for accessibility

router.route('/users/:user_id')
  .put(users.update)
  .delete(users.delete);

// NOTES ENDPOINTS
// get all notes that belongs to the user
router.route('/users/:user_id/notes')
  .get(notes.getAll);


router.route('/notes/:user_id?')
  .post(notes.create)
  .put(notes.update);

router.route('/notes')
  // .get(notes.getNote)
  .delete(notes.delete);

router.route('/users/logout')
  .post(users.logout);

module.exports = router;