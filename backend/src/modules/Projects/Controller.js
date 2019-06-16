const { model: ProjectsModel } = require('./Model');
const { NotFoundError } = require('../../utils/Errors');

const projectValidations = require('./Validation');

class ProjectsController {
  async indexProjects(req, res, next) {
    try {
      const projects = await ProjectsModel.findByOwner(req.user._id);
      res.json({ data: projects });
    } catch (ex) {
      next(ex);
    }
  }

  async createProject(req, res, next) {
    const { body: { name }, user } = req;
    try {
      const project = await ProjectsModel.create({ name, owner: user._id });
      res.json({ data: project });
    } catch (ex) {
      next(ex);
    }
  }

  async deleteProject(req, res, next) {
    const {
      params: { projectId },
      user,
    } = req;
    try {
      const project = await ProjectsModel.findOne({ _id: projectId, owner: user._id });
      if(!project) return next(new NotFoundError('error.projects.not-found'));
      await project.remove();
      res.sendStatus(200);
    } catch (ex) {
      next(ex);
    }
  }

  async projectCreateTask(req, res, next) {
    const {
      body: { description },
      params: { projectId },
      user,
    } = req;
    try{
      const project = await ProjectsModel.findOne({ _id: projectId, owner: user._id });
      if(!project) return next(new NotFoundError('error.projects.not-found'));
      await project.createTask( description );
      res.json(project);
    } catch (ex) {
      next(ex);
    }
  }

  async projectCompleteTask(req, res, next) {
    const {
      params: { projectId, taskId },
      user,
    } = req;
    try {
      const project = await ProjectsModel.findOne({ _id: projectId, owner: user._id });
      if(!project) return next(new NotFoundError('error.projects.not-found'));
      await project.completeTask(taskId);
      res.json(project);
    } catch (ex) {
      next(ex);
    }
  }

  async projectUpdateTask(req, res, next) {
    const {
      body: { description },
      params: { projectId, taksId },
      user,
    } = req;
    try {
      const project = await ProjectsModel.findOne({ _id: projectId, owner: user._id });
      if(!project) return next(new NotFoundError('error.projects.not-found'));
      await project.updateTask(taksId, description);
      res.json(project);
    } catch (ex) {
      next(ex);
    }
  }
  async projectDeleteTaks(req, res, next) {
    const {
      params: { projectId, taskId },
      user,
    } = req;
    try {
      const project = await ProjectsModel.findOne({ _id: projectId, owner: user._id });
      if(!project) return next(new NotFoundError('error.projects.not-found'));
      await project.deleteTask(taskId);
      res.json(project);
    } catch (ex) {
      next(ex);
    }
  }


}

const ctrl = new ProjectsController();

module.exports = { 
  indexProjects: ctrl.indexProjects,
  createProject: [ projectValidations.createProject ,ctrl.createProject ],
  createTask: [ projectValidations.createTask, ctrl.projectCreateTask ],
  completeTask: [ projectValidations.completeTask, ctrl.projectCompleteTask],
  updateTask: [projectValidations.updateTask, ctrl.projectUpdateTask],
  deleteProject: ctrl.deleteProject,
  deleteTask: ctrl.projectDeleteTaks,
};