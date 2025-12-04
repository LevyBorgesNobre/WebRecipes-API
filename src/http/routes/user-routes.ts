import { FastifyInstance } from "fastify";
import { register } from "../controllers/user/register";
import { authenticate } from "../controllers/user/authenticate";
import { editUserProfile } from "../controllers/user/edit-user-profile";

export function userRoutes(app: FastifyInstance){
  app.post('/users/register', register)
  app.post('/users/authenticate', authenticate)
  app.post('/users/:id/user-profile', editUserProfile)
}