const checkSchema = require('../../utils/Validation');

const createProject = {
  name: {
    in: 'body',
    isLength: {
      options: {
        min: 3,
      },
      errorMessage: 'error.validation.name.short',
    }
  }
}

const createTask = {
  description: {
    in: 'body',
    isLength: {
      options: {
        min: 3,
      },
      errorMessage: 'error.validation.description.short',
    },
  },
  projectId: {
    in: 'params',
    errorMessage: 'error.validation.project-id',
  },
};

const completeTask = {
  projectId: {
    in: 'params',
  },
  taskId: {
    in: 'params',
  }
}

// Just realized this is dumb
// should had done a mapping bettwen 
// Validations -> checkSchema(Validations)
module.exports = {
  createProject: checkSchema(createProject),
  createTask: checkSchema(createTask),
  completeTask: checkSchema(completeTask),
  updateTask: checkSchema({ ...completeTask, ...createTask }),
};
