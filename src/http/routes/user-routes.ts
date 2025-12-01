import { FastifyInstance } from "fastify";
import { register } from "../controllers/user/register";
import { authenticate } from "../controllers/user/authenticate";

export function userRoutes(app: FastifyInstance){
  app.post('/users/register', register)
  app.post('/users/authenticate', authenticate)
}