import { FastifyInstance } from "fastify";
import { createRecipe } from "../controllers/recipe/create-recipe";
import { deleteRecipe } from "../controllers/recipe/delete-recipe";
import { editRecipe } from "../controllers/recipe/edit-recipe";
import { verifyJwt } from "../middleware/verify-jwt";

export function recipeRoutes(app: FastifyInstance){
   app.post('/recipes/:id/create', {onRequest: [verifyJwt]}, createRecipe)
   app.delete('/recipes/:userId/:recipeId/delete', {onRequest: [verifyJwt]}, deleteRecipe)
   app.patch('/recipes/:userId/:recipeId/edit', {onRequest: [verifyJwt]}, editRecipe)
}