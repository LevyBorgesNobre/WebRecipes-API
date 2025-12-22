import { InMemoryUserRepository } from "../../../../repositories/in-memory-repository/in-memory-user-repository";
import { InMemoryRecipeRepository } from "../../../../repositories/in-memory-repository/in-memory-recipe-repository";
import { describe, expect, it, beforeEach } from "vitest";
import { randomUUID } from "node:crypto";
import { InMemoryFavoriteRepository } from "../../../../repositories/in-memory-repository/in-memory-favorite-repository";
import { DeleteFavoriteUseCase } from "../delete-favorite";

let usersRepository: InMemoryUserRepository
let recipeRepository: InMemoryRecipeRepository
let favoriteRepository: InMemoryFavoriteRepository
let sut: DeleteFavoriteUseCase
 
describe('Create Recipe Use Case.', ()=>{
    beforeEach(()=>{
        usersRepository = new InMemoryUserRepository()
        recipeRepository = new InMemoryRecipeRepository()
        favoriteRepository = new InMemoryFavoriteRepository()
        sut = new DeleteFavoriteUseCase(usersRepository, recipeRepository, favoriteRepository)
    })
   
    it('should be able to delete favorite from recipe.', async()=>{

          const user = await usersRepository.create({
                      id:randomUUID(),
                      name:'Alex',
                      email:'exampleOne@gmail.com',
                      password:'2597252'
                  })
          
                 const recipe = await recipeRepository.create({
                     id: randomUUID(),
                     recipe_title: 'teste',
                     description: 'descricao',
                     recipe_image: 'imagem da receita',
                     cook_time: '10min',
                     servings: '4',
                     ingredients: [
                         "3 cenouras médias",
                         "3 ovos",
                         "1 xícara de óleo",
                         "2 xícaras de farinha de trigo",
                         "2 xícaras de açúcar",
                         "1 colher de sopa de fermento"
                     ],
                     cook_instructions: [
                         "Bata as cenouras, os ovos e o óleo no liquidificador.",
                         "Misture com a farinha, açúcar e fermento.",
                         "Leve ao forno preaquecido a 180°C por cerca de 40 minutos.",
                         "Prepare a cobertura de chocolate e jogue por cima."
                     ],
                     user: {
                      connect:{
                          id:user.id
                      }
                     }
          
                 })
      
                 const favorite = await favoriteRepository.create({
                   id:randomUUID(),
                   user:{
                        connect:{id:user.id}
                    },
                    recipes:{
                      connect:{id:recipe.id}
                    }         
                    })
                  
                 const deleted = await sut.delete({
                    favoriteId:favorite.id,
                    recipeId:recipe.id,
                    userId:user.id
          
                 })
                     expect(deleted).toBeTruthy()
                     expect(favoriteRepository.favorites.length).toBe(0)
    })

    it('should not be able to delete a favorite with invalid favoriteId, userId or recipeId.', async()=>{
                     
                      await expect(()=>
                        sut.delete({
                           favoriteId:randomUUID(),
                           recipeId:randomUUID(),
                           userId:randomUUID()
                        })
                      ).rejects.toBeInstanceOf(Error)
                    
                    })
         
})