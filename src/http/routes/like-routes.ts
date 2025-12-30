import { FastifyInstance } from "fastify";
import { likeRecipe } from "../controllers/like/like-recipe";
import { unlikeRecipe } from "../controllers/like/unlike-recipe";
import { verifyJwt } from "../middleware/verify-jwt";
import { loginRequired } from "../middleware/login-required";


export function likeRoutes(app: FastifyInstance){
    app.post('/recipes/:recipeId/like', {onRequest: [verifyJwt, loginRequired]}, likeRecipe)
    app.delete('/recipes/:likeId/:recipeId/unlike', {onRequest: [verifyJwt, loginRequired]}, unlikeRecipe)
}