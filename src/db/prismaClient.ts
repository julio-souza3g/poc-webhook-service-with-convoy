import { PrismaClient } from '@prisma/client';
import { FastifyInstance } from 'fastify';

const prisma = new PrismaClient();

export default prisma;
