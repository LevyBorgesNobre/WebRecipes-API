import { FastifyInstance } from "fastify";
import { register } from "../controllers/register";

export function userRoutes(app: FastifyInstance){
  app.post('/users/register', register)
}