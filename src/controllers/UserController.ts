import { FastifyReply, FastifyRequest } from "fastify";
import { Controller, DELETE, POST } from "fastify-decorators";

import { handleUserEvent } from "../services/eventHandler";

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
          await handleUserEvent(user, "user.created");
        }

        return reply.status(201).send(user);
      } catch (error) {
        console.error(error);
        return reply.status(500).send({ error: "Internal server error" });
      }
    }

    @DELETE({ url: "/:id" })
    async deleteUser(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
      try {
        const { id } = request.params;

        // check if user exists
        const user = await this.prisma.user.findUnique({
          where: {
            id: parseInt(id),
          },
        });

        if (!user) {
          return reply.status(404).send({ error: "User not found" });
        }

        await this.prisma.user.update({
          where: {
            id: parseInt(id),
          },
          data: {
            deletedAt: new Date(),
          },
        });

        // calls the event handler
        await handleUserEvent(user, "user.deleted");
        return reply.status(200).send({ message: "User deleted successfully" });
      } catch (error) {
        console.error(error);
        return reply.status(500).send({ error: "Internal server error" });
      }
    }
}