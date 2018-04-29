const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const notesSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'Users' },
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

module.exports = notesSchema;