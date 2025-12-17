import fastify from "fastify";
import { userRoutes } from "./http/routes/user-routes";
import { recipeRoutes } from "./http/routes/recipe-routes";
import { likeRoutes } from "./http/routes/like-routes";
import { favoriteRoutes } from "./http/routes/favorite-routes";
import { commentRoutes } from "./http/routes/comment-routes";
import { env } from "./env";
import fastifyJwt from "@fastify/jwt";


export const app = fastify()

app.register(fastifyJwt, {
    secret:env.JWT_SECRET
})
app.register(userRoutes)
app.register(recipeRoutes)
app.register(likeRoutes)
app.register(favoriteRoutes)
app.register(commentRoutes)