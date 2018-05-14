const Notes = require('../models/user.js');

module.exports = {
  create: (request, response) => {
    Notes
      .findById({
        _id: request.params.user_id
      })
      .select('notes')
      .exec((error, user) => {

        if (user) {
          user.notes.push({
            user_id: request.params.user_id,
            title: request.body.title,
            content: request.body.content,
          });
          const note = user.notes[0];
          user.save((err, note) => {
            if (error) {
              response.status(404).send({
                message: error
              });
            } else {
              response.status(202).send({
                message: note
              });
            }
          });

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
            error: error
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
      .select('notes.title notes.content notes._id notes.createdAt')
      .exec((error, notes) => {
        if (error) {
          return response.status(409).send({
            error: error
          });
        } else if (notes) {
          response.status(200).send({
            message: notes.notes
          });
        } else {
          response.status(404).send({
            message: 'user has no notes'
          });
        }
      });
  },

  update: (request, response) => {
    Notes
      .findById({
        _id: request.params.user_id
      }).exec((err, usernotes) => {
        let notesArray = usernotes.notes.map((note) => {
          if (note._id == request.body.note_id) {
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
      .findById({ _id: request.params.user_id })
      .exec((err, user) => {
        user.notes.id(request.body.note_id).remove();
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