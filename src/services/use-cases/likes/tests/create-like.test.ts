import { InMemoryUserRepository } from "../../../../repositories/in-memory-repository/in-memory-user-repository";
import { InMemoryRecipeRepository } from "../../../../repositories/in-memory-repository/in-memory-recipe-repository";
import { describe, expect, it, beforeEach } from "vitest";
import { randomUUID } from "node:crypto";
import { CreateLikeUseCase } from "../create-like";
import { InMemoryLikeRepository } from "../../../../repositories/in-memory-repository/in-memory-like-repository";

let usersRepository: InMemoryUserRepository
let recipeRepository: InMemoryRecipeRepository
let likeRepository: InMemoryLikeRepository
let sut: CreateLikeUseCase
 
describe('Create Recipe Use Case.', ()=>{
    beforeEach(()=>{
        usersRepository = new InMemoryUserRepository()
        recipeRepository = new InMemoryRecipeRepository()
        likeRepository = new InMemoryLikeRepository()
        sut = new CreateLikeUseCase(usersRepository, recipeRepository, likeRepository)
    })
   
    it('should be able to create a like for a recipe.', async()=>{

         const user = await usersRepository.create({
              id:randomUUID(),
              name:'Alex',
              email:'exampleOne@gmail.com',
             password:'2597252'
         })
        
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

       const createLike = await sut.create({
        userId:user.id,
        recipeId:recipe.id
      })
        
      expect(createLike.like.userId).toBe(user.id)
      expect(createLike.like.recipesId).toBe(recipe.id)
    })

    it('should not be able create a like for recipe with invalid userId or recipeId', async()=>{

      await expect(sut.create({
        userId:randomUUID(),
        recipeId:randomUUID()
      })).rejects.toBeInstanceOf(Error)
    })

})