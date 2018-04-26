const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const notesSchema = new Schema({
  ownerId: String,
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Notes', notesSchema);