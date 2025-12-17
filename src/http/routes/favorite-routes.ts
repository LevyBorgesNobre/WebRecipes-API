import { FastifyInstance } from "fastify";
import { createFavorite } from "../controllers/favorite/create-favorite";
import { deleteFavorite } from "../controllers/favorite/delete-favorite-recipe";
import { verifyJwt } from "../middleware/verify-jwt";

export function favoriteRoutes(app: FastifyInstance){
  app.post('/recipes/favorite/create-favorite', {onRequest: [verifyJwt]}, createFavorite)
  app.delete('/recipes/favorite/:favoriteId/:userId/:recipeId/delete', {onRequest: [verifyJwt]}, deleteFavorite)

}