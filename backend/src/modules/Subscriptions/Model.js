const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const { projectsPlugin } = require('../Projects/Model');

const subscriptionsSchema = new Schema({
  // _id: using default ObjectId
  username: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const subscriptionModel = model('subscription', subscriptionsSchema);

function subscriptionPlugin(schema, options) {
  schema.add({ subscriptionProfile: {
    type: Schema.Types.ObjectId,
    ref: 'subscription',
  }});
  schema.pre('save', async function(next){
    try {
      // This should be unsing a transaction started at Auth/UserModel.js
      // But that would compromise mongodb compability to version 4+
      const sub = await subscriptionModel.create({ username: this.username });
      this.subscriptionProfile = sub._id;
      next();
    } catch (ex) {
      next(ex);
    }
  });
  schema.statics.findSubscription = function(username, cb) {
    subscriptionModel.findOne({ username }, (err, sub) => {
      if (err) return cb(err, null);
      cb(null, sub);
    });
  };
}

module.exports = {
  model: subscriptionModel,
  subscriptionPlugin,
};
