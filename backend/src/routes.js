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
import validatePlanStoreUpdate from './app/validators/PlanStoreUpdate';
import validateHelpOrderStore from './app/validators/HelpOrderStore';
import validateHelpOrderUpdate from './app/validators/HelpOrderUpdate';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes
  .get('/students/:id/checkins', CheckinController.index)
  .post('/students/:id/checkins', CheckinController.store)
  .get('/students/:id/help-orders', HelpOrderController.index);

routes.post('/students/:id/help-orders', validateHelpOrderStore, HelpOrderController.store);

routes.use(authMiddleware);

routes
  .get('/dashboard', DashboardController.index);

routes
  .get('/students', StudentController.index)
  .post('/students', validateStudentStore, StudentController.store)
  .put('/students/:id', StudentController.update);

routes.put('/students/:id/help-orders', validateHelpOrderUpdate, HelpOrderController.update);

routes
  .get('/plans', PlanController.index)
  .post('/plans', validatePlanStoreUpdate, PlanController.store)
  .put('/plans/:id', validatePlanStoreUpdate, PlanController.update)
  .delete('/plans/:id', PlanController.delete);

routes
  .get('/enrollments', EnrollmentController.index)
  .post('/enrollments', EnrollmentController.store)
  .put('/enrollments/:id', EnrollmentController.update)
  .delete('/enrollments/:id', EnrollmentController.delete);

routes.get('/answer/help-orders', AnswerHelpOrderController.index);

export default routes;
