import { FastifyInstance } from "fastify";
import { createRecipe } from "../controllers/recipe/create-recipe";
import { deleteRecipe } from "../controllers/recipe/delete-recipe";
import { editRecipe } from "../controllers/recipe/edit-recipe";

export function recipeRoutes(app: FastifyInstance){
   app.post('/recipes/:id/create', createRecipe)
   app.delete('/recipes/:userId/:recipeId/delete', deleteRecipe)
   app.patch('/recipes/:userId/:recipeId/edit', editRecipe)
}