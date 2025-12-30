import { FastifyInstance } from "fastify";
import { register } from "../controllers/user/register";
import { authenticate } from "../controllers/user/authenticate";
import { editUserProfile } from "../controllers/user/edit-user-profile";
import { userData } from "../controllers/user/user-data";
import { verifyJwt } from "../middleware/verify-jwt";
import { loginRequired } from "../middleware/login-required";

export function userRoutes(app: FastifyInstance){
  app.post('/users/register', register)
  app.post('/users/authenticate', authenticate)
  app.post('/users/edit-user-profile', {onRequest: [verifyJwt, loginRequired]}, editUserProfile)
  app.get('/users/user-data', {onRequest: [verifyJwt, loginRequired]}, userData)
}