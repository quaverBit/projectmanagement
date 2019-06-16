const mongoose = require('mongoose');
// using bcryptjs it's easy to install
// use bcrypt it's better for production
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { subscriptionPlugin } = require('../Subscriptions/Model');

const { env } = process
const { Schema, model} = mongoose;

const UserSchema = new Schema({
  // _id: using the defauld ObjectId
  username: {
    type: String,
    required: true,
    unique: true,
    min: 3,
    index: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'user',
  },
});

UserSchema.pre('save', function(next) {
  if(this.isNew || this.isModified('password')) {
    const user = this;
    bcrypt.genSalt(parseInt(env.SALT_STEPS), (errSalt, salt) => {
      if(errSalt) return next(errSalt);
      bcrypt.hash(user.password, salt, (errHash, hash) => {
        if(errHash) return next(errHash);
        user.password = hash;
        next();
      })
    })
  } else {
    next();
  }
});

UserSchema.methods.signToken = function() {
  return jwt.sign({
    user: this.username,
    id: this._id,
    role: this.role,
  },
  env.JWT_SECRET,{
    issuer: 'identified issuer',
    // expiresIn: '1h', We will not care about refresh tokens
  });
};

UserSchema.methods.comparePassword = function(password, cb) {
  bcrypt.compare(password, this.password, (err, match) => {
    if (err) cb(err, false);
    cb(null, match);
  })
}

UserSchema.statics.findFromToken = function(token, cb) {
  jwt.verify(
    token,
    env.JWT_SECRET, (err, decoded) => {
      if(err) return cb(err, null);
      model('user').findSubscription(
        decoded.user,
        (errFind, user) => {
          if(errFind) return cb(errFind, user);
          cb(null, user);
        },
      );
    },
  )
}

UserSchema.plugin(subscriptionPlugin);

module.exports = { model: 
  model('user', UserSchema),
};
