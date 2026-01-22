import { InMemoryUserRepository } from "../../../../repositories/in-memory-repository/in-memory-user-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateCommentUseCase } from "../create-comment";
import { InMemoryCommentRepository } from "../../../../repositories/in-memory-repository/in-memory-comment-repository";
import { InMemoryRecipeRepository } from "../../../../repositories/in-memory-repository/in-memory-recipe-repository";
import { randomUUID } from "crypto";

let usersRepository: InMemoryUserRepository
let recipeRepository: InMemoryRecipeRepository
let commentRepository: InMemoryCommentRepository
let sut: CreateCommentUseCase

describe('Create Recipe Use Case.', ()=>{
    beforeEach(()=>{
        usersRepository = new InMemoryUserRepository()
        recipeRepository = new InMemoryRecipeRepository()
        commentRepository = new InMemoryCommentRepository()
        sut = new CreateCommentUseCase(recipeRepository, commentRepository)
    })

    it('should be able to create a comment.', async()=>{
       const user = await usersRepository.create({
                name:'Alex',
                email:'exampleOne@gmail.com',
                password:'2597252'
            })
        
         const recipe  = await recipeRepository.create({
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
         userId:user.id
       })

       const comment = await sut.create({
          userId:user.id,
          recipeId:recipe.id,
          comment:'primeiro comentatio'
       })
       
       expect(comment.createComment.userId).toBe(user.id)
       expect(comment.createComment.recipesId).toBe(recipe.id)
       expect(comment.createComment.comment).toBe('primeiro comentatio')

    })

    it('should not be able to create a comment with invalid userId or recipeId.', async()=>{
        await expect(
            sut.create({
                userId:randomUUID(),
                recipeId:randomUUID(),
                comment:'segundo comentario'
            })
        ).rejects.instanceOf(Error)
    })
})