import { RecipeRepository } from "@/repositories/recipe-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { Recipes } from "generated/prisma/browser";

interface RecipeUseCaseRequest {
  id:                 string;
  recipe_title:       string;
  description:        string;
  recipe_image:       string;
  cook_time:          string;
  servings:           string;
  ingredients:        string[];
  cook_instructions:  string[];
}

interface RecipeUseCaseResponse {
  recipe: Recipes
}

export class CreateRecipeUseCase{
    constructor(
    private  recipeRepository: RecipeRepository,
    private  usersRepository: UsersRepository
    ){}

    async create({
    id,
    recipe_title,
    description,
    recipe_image,
    cook_time,
    servings,
    ingredients,
    cook_instructions,
    }: RecipeUseCaseRequest): Promise<RecipeUseCaseResponse>{
      
      const user = await this.usersRepository.findById(id)

      if(!user){
        throw new ResourceNotFoundError()
      }

      const recipe = await this.recipeRepository.create({
        recipe_title,
        description,
        recipe_image,
        cook_time,
        servings,
        ingredients,
        cook_instructions,
        user: { connect: { id: user.id } }
      })
     
      return {
        recipe
      }
    }
}