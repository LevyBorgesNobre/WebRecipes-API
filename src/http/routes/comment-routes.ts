import { FastifyInstance } from "fastify";
import { createComment } from "../controllers/comment/create-comment";
import { editComment } from "../controllers/comment/edit-comment";
import { deleteComment } from "../controllers/comment/delete-comment";
import { verifyJwt } from "../middleware/verify-jwt";
import { loginRequired } from "../middleware/login-required";

export function commentRoutes(app: FastifyInstance){
    app.post('/recipes/:recipeId/create-comment', {onRequest: [verifyJwt, loginRequired]}, createComment)
    app.patch('/recipes/:recipeId/:commentId/edit-comment', {onRequest: [verifyJwt, loginRequired]}, editComment)
    app.delete('/recipes/:recipeId/:commentId/delete-comment', {onRequest: [verifyJwt, loginRequired]}, deleteComment)
}