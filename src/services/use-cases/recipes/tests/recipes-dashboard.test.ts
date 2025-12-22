import { InMemoryRecipeRepository } from "../../../../repositories/in-memory-repository/in-memory-recipe-repository";
import { describe, expect, it, beforeEach } from "vitest";
import { randomUUID } from "node:crypto";
import { RecipesDashboardUseCase } from "../recipes-dashboard";

let recipeRepository: InMemoryRecipeRepository
let sut: RecipesDashboardUseCase

describe('Recipes Dashboard Use Case.', ()=>{
    beforeEach(()=>{
        recipeRepository = new InMemoryRecipeRepository()
        sut = new RecipesDashboardUseCase(recipeRepository)
    })
   
    it('should be able to return a list of recipes.', async()=>{

      const user = {
         id:randomUUID()
      }

        await recipeRepository.create({
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
          
       const dashboard = await sut.execute()

       expect(dashboard.recipes.length).toBe(1)
       expect(dashboard.recipes).toEqual(expect.any(Array))
    })

})