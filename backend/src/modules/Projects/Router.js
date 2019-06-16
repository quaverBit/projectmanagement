const { Router } = require('express');
const ProtectedRoute = require('../Auth/ProtectedRoute')
const projectController = require('./Controller');

const test = (req, res) => {
  res.json( req.user )
};

class ProjectsRouter{
  constructor() {
    this.expressRouter = Router();
    const { expressRouter } = this;
    expressRouter.use(ProtectedRoute());
    expressRouter.get('/', projectController.indexProjects);
    expressRouter.post('/', projectController.createProject);
    expressRouter.delete('/:projectId', projectController.deleteProject);
    expressRouter.post('/:projectId/tasks', projectController.createTask);
    expressRouter.patch('/:projectId/tasks/:taskId', projectController.updateTask);
    expressRouter.delete('/:projectId/tasks/:taskId', projectController.deleteTask);
    expressRouter.post('/:projectId/tasks/:taskId/complete', projectController.completeTask)

  }
}

module.exports = new ProjectsRouter().expressRouter;