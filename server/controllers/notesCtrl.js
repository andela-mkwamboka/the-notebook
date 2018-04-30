const Notes = require('../models/user.js');

module.exports = {
  create: (request, response) => {
    console.log(request.params.user_id);
    Notes
      .findById({
        _id: request.params.user_id
      })
      .select('notes')
      .exec((error, user) => {
        if (user) {
          const newNote = user.notes.create({
            user_id: request.params.user_id,
            title: request.body.title,
            content: request.body.content,
          });
          if (newNote) {
            response.status(202).send({
              message: newNote
            });
          }
        } else if (error) {
          response.status(500).send({
            error: error
          });
        }
      });

  },
  // get user specific notes
  getNote: (request, response) => {
    Notes
      .findById({ _id: request.params.user_id })
      .select('notes')
      .exec((error, note) => {
        if (!note) {
          response.status(404).send({
            message: 'User has no notes'
          });
        } else if (error) {
          response.status(400).send({
            message: error
          });
        }
        response.status(200).send({
          message: note
        });
      });
  },

  getAll: (request, response) => {
    Notes
      .findById({ _id: request.params.user_id })
      .select('notes.title notes.content')
      .exec((error, notes) => {
        if (error) {
          return response.status(409).send({
            error: error
          });
        } else {
          response.status(200).send({
            notes: notes.notes
          });
        }
      });
  },

  update: (request, response) => {
    Notes
      .findOne({
        _id: request.params.user_id
      }).exec((err, usernotes) => {
        let notesArray = usernotes.notes.map((note) => {
          if (note._id == request.params.note_id) {
            if (request.body.title) note.title = request.body.title;
            if (request.body.content) note.content = request.body.content;
          }
          return note;
        });

        usernotes.notes = notesArray;
        usernotes.save((error, userNotes) => {
          if (error) {
            response.status(404).send({
              error: error
            });
          }
          response.status(200).send({
            notes: userNotes.notes
          });
        });
      });
  },


  delete: (request, response) => {
    Notes
      .findById({ user_id: request.params.user_id })
      .exec((err, user) => {
        user.notes.id(request.params.notes_id).remove();
        user.save((error) => {
          if (error) {
            response.status(202).send({
              message: 404,
            });
          } else {
            response.send({
              message: 'Removed',
            });
          }
        });
      });
  }
};