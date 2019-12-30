import { Router } from 'express';

import AnswerHelpOrderController from './app/controllers/AnswerHelpOrderController';
import CheckinController from './app/controllers/CheckinController';
import HelpOrderController from './app/controllers/HelpOrderController';
import PlanController from './app/controllers/PlanController';
import RegistrationController from './app/controllers/RegistrationController';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes
  .get('/students/:id/checkins', CheckinController.index)
  .post('/students/:id/checkins', CheckinController.store)
  .get('/students/:id/help-orders', HelpOrderController.index);

routes.use(authMiddleware);

routes
  .get('/students', StudentController.index)
  .post('/students', StudentController.store)
  .put('/students/:id', StudentController.update);

routes.put('/students/:id/help-orders', HelpOrderController.update);

routes
  .get('/plans', PlanController.index)
  .post('/plans', PlanController.store)
  .put('/plans/:id', PlanController.update)
  .delete('/plans/:id', PlanController.delete);

routes
  .get('/registrations', RegistrationController.index)
  .post('/registrations', RegistrationController.store)
  .put('/registrations/:id', RegistrationController.update)
  .delete('/registrations/:id', RegistrationController.delete);

routes.get('/answer/help-orders', AnswerHelpOrderController.index);

export default routes;
