import { FastifyInstance } from "fastify";
import { favoriteRecipe } from "../controllers/favorite/favorite-recipe";
import { unfavoriteRecipe } from "../controllers/favorite/unfavorite-recipe";
import { verifyJwt } from "../middleware/verify-jwt";

export function favoriteRoutes(app: FastifyInstance){
  app.post('/recipes/:recipeId/favorite', {onRequest: [verifyJwt]}, favoriteRecipe)
  app.delete('/recipes/:favoriteId/:recipeId/unfavorite', {onRequest: [verifyJwt]}, unfavoriteRecipe)

}