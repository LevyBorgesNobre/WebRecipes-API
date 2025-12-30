import { FastifyInstance } from "fastify";
import { createRecipe } from "../controllers/recipe/create-recipe";
import { deleteRecipe } from "../controllers/recipe/delete-recipe";
import { editRecipe } from "../controllers/recipe/edit-recipe";
import { verifyJwt } from "../middleware/verify-jwt";
import { recipesDashboard } from "../controllers/recipe/recipes-dashboard";
import { selectedRecipe } from "../controllers/recipe/selected-recipe";
import { userRecipes } from "../controllers/recipe/user-recipes";
import { loginRequired } from "../middleware/login-required";

export function recipeRoutes(app: FastifyInstance){
   app.post('/recipes/create', {onRequest: [verifyJwt, loginRequired]}, createRecipe)
   app.delete('/recipes/:recipeId/delete', {onRequest: [verifyJwt, loginRequired]}, deleteRecipe)
   app.patch('/recipes/:recipeId/edit', {onRequest: [verifyJwt, loginRequired]}, editRecipe)
   app.get('/recipes/recipes-dashboard', recipesDashboard)
   app.get('/recipes/:id/selected', selectedRecipe)
   app.get('/recipes/dashboard/user-recipes', {onRequest: [verifyJwt, loginRequired]}, userRecipes)
}