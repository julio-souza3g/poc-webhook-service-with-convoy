import "dotenv/config";
import fastify, { FastifyInstance } from "fastify";
import { bootstrap } from "fastify-decorators";
import formBody from "@fastify/formbody";
import { resolve } from "path";

import prisma from "./db/prismaClient";
import routes from "./routes";

import "./services/convoy";

const app: FastifyInstance = fastify({ logger: true });

app.decorate("prisma", prisma);
app.register(bootstrap, {
    directory: resolve(__dirname, "controllers"),
});
app.register(formBody, {
    bodyLimit: 1048576,
});
app.register(routes);

app.listen({ port: 4000 }, (err, address) => {
    if (err) {
        app.log.error(err);
    }
    console.log(`App listening at ${address}`);
});