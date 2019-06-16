const mongoose = require('mongoose');
const { TeaPotError, NotFoundError } = require('../../utils/Errors')

const { Schema, Schema: { Types: { ObjectId } } } = mongoose;

const taskSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  done: {
    type: Boolean,
    default: false,
  },
  doneAt: {
    type: Date,
  },
});

function tasksPlugin(schema, options) {
  schema.add({tasks: { type: [taskSchema] }});

  schema.methods.completeTask = function(taskId){
    return new Promise((resolve, reject) => {
      // this should be using mongodb services because node event loop
      const task = this.tasks.find((val) => (val._id.toString() == taskId ));
      task.done = true;
      task.doneAt = new Date();
      this.save((err, result) => {
        if (err) return reject(err);
        resolve(result);
      })
    });
  };

  schema.methods.updateTask = function(taskId, description){
    return new Promise((resolve, reject) => {
      const task = this.tasks.find((val) => val._id.toString == taskId );
      if(task.done) return reject(new TeaPotError('error.tasks.already-done'));
      task.description = description;
      this.save((err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  };
  
  schema.methods.createTask = function(description) {
    return new Promise((resolve, reject) => {
      this.tasks.push({description});
      this.save((err, result) => {
        if(err) return reject(err);
        resolve(result);
      });
    })
  };

  schema.methods.deleteTask = function(taskId) {
    return new Promise((resolve, reject) => {
      const taskIndex = this.tasks.findIndex((val) => (val._id ==  taskId));
      if( taskIndex < 0) {
        return reject(new NotFoundError('error.tasks.not-found'));
      } else if (this.tasks[taskIndex].done) {
        return reject(new TeaPotError('error.tasks.already-done'));
      }
      this.tasks.splice(taskIndex, 1);
      this.save((err, result) => {
        if(err) return reject(err);
        resolve(result);
      });
    });
  }
};

module.exports = {
  plugin: tasksPlugin,
}
