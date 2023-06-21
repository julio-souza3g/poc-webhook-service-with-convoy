import { FastifyInstance } from 'fastify';
import userRoutes from './userRoutes';

export default function routes(fastify: FastifyInstance, options: any, done: () => void) {
  fastify.register(userRoutes);

  done();
}