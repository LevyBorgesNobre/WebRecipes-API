import { FastifyInstance } from "fastify";
import { createLike } from "../controllers/like/create-like";
import { deleteLike } from "../controllers/like/delete-like";
import { verifyJwt } from "../middleware/verify-jwt";


export function likeRoutes(app: FastifyInstance){
    app.post('/recipes/like/create-like', {onRequest: [verifyJwt]}, createLike)
    app.delete('/recipes/like/:likeId/:userId/:recipeId/delete', {onRequest: [verifyJwt]}, deleteLike)
}