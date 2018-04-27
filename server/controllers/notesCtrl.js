const Notes = require('../models/notes.js');

module.exports = {
  create: (request, response) => {
    const notes = new Notes();

    notes.ownerId = request.body.ownerId;
    notes.title = request.body.title;
    notes.content = request.body.content;

    notes.save((error, notes) => {
      if (error) {
        response.status(500).json({
          error: error
        });
      } else {
        response.status(200).json({
          message: notes
        });
      }
    });

  },

  getAll: (request, response) => {
    Notes.find((error, notes) => {
      if (error) {
        return response.status(409).json({
          error: error
        });
      } else {
        response.status(200).json({
          message: notes
        });
      }
    });
  },

  getNote: (request, response) => {
    Notes.findById({
      _id: request.params.note_id
    }, (error, note) => {
      if (error) {
        return response.status(409).json({
          error: error
        });
      } else {
        response.status(200).json({
          note: note
        });
      }
    });
  },

  update: (request, response) => {
    Notes.findById({
      _id: request.params.note_id
    }, (error, note) => {
      // update note
      if (request.body.title) note.title = request.body.title;
      if (request.body.content) note.content = request.body.content;
      if (error) {
        return response.status(400).json({
          error: error
        });
      } else {
        // save the new user details
        note.save((error, note) => {
          response.status(200).json({
            message: 'user details updated',
            note: note
          });
        });
      }
    });
  },

  delete: (request, response) => {
    Notes.remove({
      _id: request.params.note_id
    }, (error) => {
      if (error) {
        return response.status(409).json({
          message: 'Unable to delete account'
        });
      } else {
        response.status(202).json({
          message: 'Deleted succesfully',
        });
      }
    });
  }
};