import { Router } from 'express';
import ApiController from './app/controllers/ApiController'
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import TodoController from './app/controllers/TodoController'
// import CompanyUserController from './app/controllers/companyUserController';
import authMiddleware from './app/middlewares/auth';
import corsMiddleware from './app/middlewares/cors';
// import cors from 'cors';

const routes = new Router();

//Validar se api esta rodando
routes.get('/api', ApiController.test)

routes.use(corsMiddleware);
routes.post('/api/users', UserController.store);
routes.post('/api/sessions', SessionController.store);
// routes.post('/validate-token', SessionController.validateToken);

// Todas as rotas após essa linha terá validações
routes.use(authMiddleware);

routes.post('/api/tasks', TodoController.store);
routes.get('/api/tasks', TodoController.all);
routes.delete('/api/tasks/:id', TodoController.delete)

export default routes;
