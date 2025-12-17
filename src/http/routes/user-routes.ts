import { FastifyInstance } from "fastify";
import { register } from "../controllers/user/register";
import { authenticate } from "../controllers/user/authenticate";
import { editUserProfile } from "../controllers/user/edit-user-profile";
import { userData } from "../controllers/user/user-data";
import { verifyJwt } from "../middleware/verify-jwt";

export function userRoutes(app: FastifyInstance){
  app.post('/users/register', register)
  app.post('/users/authenticate', authenticate)
  app.post('/users/:id/user-profile', {onRequest: [verifyJwt]}, editUserProfile)
  app.get('/users/user-data', {onRequest: [verifyJwt]}, userData)
}