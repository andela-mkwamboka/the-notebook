const Notes = require('../models/user.js'),
  mongoose = require('mongoose');
// const notes = require('../models/notes.js');

module.exports = {
  create: (request, response) => {
    // console.log(mongoose.Types.ObjectId(request.query.userId));
    // const userId = request.query.userId;
    Notes
      .findById({
        _id: request.query.userId
      })
      .select('notes').exec((error, user) => {
        console.log('----', user.notes);
        if (user) {
          user.notes.push({
            user_id: mongoose.Types.ObjectId(user._id),
            title: request.body.title,
            content: request.body.content,
          });
          user.save((error, users) => {
            if (error) {
              response.status(500).send({
                error: error
              });
            } else {
              response.status(201).send({
                thisDoc: users.docs[users.docs.length - 1]
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
      .findById(request.query.userId)
      .select('notes.title notes.content'), (error, notes) => {
        if (!notes) {
          response.status(404).send({
            message: 'User has no notes'
          });
        } else if (error) {
          response.status(400).send({
            message: error
          });
        }
        response.status(200).send({
          message: notes
        });
      };
  },

  getAll: (request, response) => {
    Notes
      .findById(request.query.userId)
      .select('notes'), (error, notes) => {
        if (error) {
          return response.status(409).send({
            error: error
          });
        } else {
          response.status(200).send({
            note: notes
          });
        }
      };
  },

  update: (request, response) => {
    Notes
      .findOne({
        _id: request.query.userId
      }), (err, usernotes) => {
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
      };
  },


  delete: (request, response) => {
    Notes.findById(request.query.userId), (err, user) => {
      user.save((error) => {
        if (error) {
          response.status(202).json({
            message: 404,
          });
        } else {
          response.json({
            message: 'Removed',
          });
        }
      });
    };
  }
};