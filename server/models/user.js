const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  bcrypt = require('bcrypt-nodejs');

var UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Please fill a valid email address'],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  notes: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

// Hash the password
UserSchema.pre('save', function(next) {
  const user = this;
  if (!user.isModified('password')) return next();
  bcrypt.hash(user.password, null, null, (err, hash) => {
    if (err) return next(err);
    user.password = hash;
    next();
  });
});

// Compare a given password with the database hash
UserSchema.methods.comparePassword = function(password) {
  const user = this;
  return bcrypt.compareSync(password, user.password);
};

module.exports = mongoose.model('User', UserSchema);