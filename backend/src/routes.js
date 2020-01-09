import { Router } from 'express';

import AnswerHelpOrderController from './app/controllers/AnswerHelpOrderController';
import CheckinController from './app/controllers/CheckinController';
import DashboardController from './app/controllers/DashboardController';
import EnrollmentController from './app/controllers/EnrollmentController';
import HelpOrderController from './app/controllers/HelpOrderController';
import PlanController from './app/controllers/PlanController';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';

import validateStudentStore from './app/validators/StudentStore';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes
  .get('/students/:id/checkins', CheckinController.index)
  .post('/students/:id/checkins', CheckinController.store)
  .get('/students/:id/help-orders', HelpOrderController.index);

routes.post('/students/:id/help-orders', HelpOrderController.store);

routes.use(authMiddleware);

routes
  .get('/dashboard', DashboardController.index);

routes
  .get('/students', StudentController.index)
  .post('/students', validateStudentStore, StudentController.store)
  .put('/students/:id', StudentController.update);

routes.put('/students/:id/help-orders', HelpOrderController.update);

routes
  .get('/plans', PlanController.index)
  .post('/plans', PlanController.store)
  .put('/plans/:id', PlanController.update)
  .delete('/plans/:id', PlanController.delete);

routes
  .get('/enrollments', EnrollmentController.index)
  .post('/enrollments', EnrollmentController.store)
  .put('/enrollments/:id', EnrollmentController.update)
  .delete('/enrollments/:id', EnrollmentController.delete);

routes.get('/answer/help-orders', AnswerHelpOrderController.index);

export default routes;
