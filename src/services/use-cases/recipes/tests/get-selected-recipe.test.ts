import { InMemoryRecipeRepository } from "../../../../repositories/in-memory-repository/in-memory-recipe-repository";
import { describe, expect, it, beforeEach } from "vitest";
import { randomUUID } from "node:crypto";
import { GetSelectedRecipeUseCase } from "../get-selected-recipe";


let recipeRepository: InMemoryRecipeRepository
let sut: GetSelectedRecipeUseCase

describe('Create Recipe Use Case.', ()=>{
    beforeEach(()=>{
        recipeRepository = new InMemoryRecipeRepository()
        sut = new GetSelectedRecipeUseCase(recipeRepository)
    })
   
    it('should be able to selected a recipe.', async()=>{

      const user = {
         id:randomUUID()
      }

         const recipe  = await recipeRepository.create({
           id:user.id,
           recipe_title:'teste',
           description:'descricao',
           recipe_image:'imagem da receita',
           cook_time:'10min',
           servings:'4',
           ingredients:[
          "3 cenouras médias",
          "3 ovos",
          "1 xícara de óleo",
          "2 xícaras de farinha de trigo",
          "2 xícaras de açúcar",
          "1 colher de sopa de fermento"
          ],
         cook_instructions:[
         "Bata as cenouras, os ovos e o óleo no liquidificador.",
         "Misture com a farinha, açúcar e fermento.",
         "Leve ao forno preaquecido a 180°C por cerca de 40 minutos.",
         "Prepare a cobertura de chocolate e jogue por cima."
         ],
         user:{
            connect:{
                id:user.id
            }
         }
       })
          
       const selectedRecipe = await sut.execute({
         id: recipe.id
       })

       expect(selectedRecipe.recipe.id).toBe(recipe.id)
       expect(selectedRecipe.recipe.id).not.toBe(undefined)
    })

    it('should not be able to selected a recipe with invalid id.', async()=>{
        await expect(
            sut.execute({
                id:randomUUID()
            })
        ).rejects.toBeInstanceOf(Error)
    })
    
})