import fastify from "fastify";
import { userRoutes } from "./http/routes/user-routes";
import { recipeRoutes } from "./http/routes/recipe-routes";

export const app = fastify()

app.register(userRoutes)
app.register(recipeRoutes)