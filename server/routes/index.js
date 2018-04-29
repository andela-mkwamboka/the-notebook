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
  .post(notes.create);

router.route('/notes/:note_id?')
  .get(notes.getNote)
  .put(notes.update)
  .delete(notes.delete);


module.exports = router;