import { FastifyInstance } from 'fastify';
import UserController from '../controllers/UserController';

function userRoutes(fastify: FastifyInstance, options: any, done: () => void) {
  const userController = new UserController(fastify);

  fastify.post('/user', userController.createUser);
  fastify.delete('/user/:id', userController.deleteUser);

  done();
}

export default userRoutes;
