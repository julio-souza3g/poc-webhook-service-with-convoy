import { FastifyReply, FastifyRequest } from "fastify";
import { Controller, POST } from "fastify-decorators";

import { handleUserCreatedEvent } from "../services/eventHandler";

interface CreateUserRequestBody {
  name: string;
  email: string;
  password: string;
}

@Controller({ route: "/user" })
export default class UserController {
    prisma;
    constructor(fastify: any) {
      this.prisma = fastify.prisma;
    }

    @POST({ url: "/" })
    async createUser(request: FastifyRequest<{ Body: CreateUserRequestBody }>, reply: FastifyReply) {
      try {
        const { name, email, password } = request.body;

        // Check if required fields exist
        if (!name || !email || !password) {
          return reply.status(400).send({ error: "Missing required fields" });
        }

        // check if user already exists with email
        const userExists = await this.prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (userExists) {
          return reply.status(400).send({ error: "User already exists" });
        }

        const user = await this.prisma.user.create({
          data: {
            name,
            email,
            password,
          },
        });

        // calls the event handler
        if (user) {
          await handleUserCreatedEvent(user);
        }

        return reply.status(201).send(user);
      } catch (error) {
        console.error(error);
        return reply.status(500).send({ error: "Internal server error" });
      }
    }
}