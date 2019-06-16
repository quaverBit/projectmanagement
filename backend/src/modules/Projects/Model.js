const mongoose = require('mongoose');

const tasksModel = require('../Tasks/Model');

const { Schema, model, Schema: { Types: { ObjectId } } } = mongoose;

const projectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  owner: {
    type: ObjectId,
    required: true,
  }
});

// compromising memory for query optimization  ¯\_(ツ)_/¯
projectSchema.index({ owner: 1 });

projectSchema.statics.findByOwner = function(ownerObjectId) {
  return new Promise((resolve, reject) => {
    model('project').find({ owner: ownerObjectId }, (err, projects) => {
      if (err) return reject(err);
      resolve(projects);
    });
  })
};

projectSchema.plugin(tasksModel.plugin);

const projectsModel = model('project', projectSchema);

module.exports = {
  model: projectsModel,
};
