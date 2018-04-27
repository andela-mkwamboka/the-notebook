const router = require('express').Router();
const users = require('../controllers/userCtrl');
const notes = require('../controllers/notesCtrl');

// USER ENDPOINTS
router.route('/users')
  .post(users.create);

router.route('/users/:user_id')
  .put(users.update)
  .delete(users.delete);

router.route('/users/login')
  .post(users.login);

// NOTES ENDPOINTS
router.route('/notes')
  .post(notes.create)
  .get(notes.getAll);

router.route('/notes/:note_id')
  .get(notes.getNote)
  .put(notes.update)
  .delete(notes.delete);


module.exports = router;