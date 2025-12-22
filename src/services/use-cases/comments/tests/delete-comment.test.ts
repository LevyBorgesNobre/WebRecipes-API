import { describe, it, beforeEach, expect } from "vitest";
import { DeleteCommentUseCase } from "../delete-comment";
import { InMemoryUserRepository } from "../../../../repositories/in-memory-repository/in-memory-user-repository";
import { InMemoryRecipeRepository } from "../../../../repositories/in-memory-repository/in-memory-recipe-repository";
import { InMemoryCommentRepository } from "../../../../repositories/in-memory-repository/in-memory-comment-repository";
import { randomUUID } from "crypto";

let usersRepository : InMemoryUserRepository
let recipeRepository: InMemoryRecipeRepository
let commentRepository: InMemoryCommentRepository
let sut: DeleteCommentUseCase

describe('Delete Comment Use Case.', ()=>{
      beforeEach(()=>{
            usersRepository = new InMemoryUserRepository()
            recipeRepository = new InMemoryRecipeRepository()
            commentRepository = new InMemoryCommentRepository()
            sut = new DeleteCommentUseCase(usersRepository, recipeRepository, commentRepository)
        })

    it('should be able to delete a comment.', async()=>{
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
      
             const commment = await commentRepository.create({
                 id:randomUUID(),
                user:{
                  connect:{
                      id:user.id
                  }
                 },
              recipes:{
                  connect:{
                      id:recipe.id
                  }
                },
                comment:'primeiro comentatio'
             })


         await sut.delete({
            userId:user.id,
            recipeId:recipe.id,
            commentId:commment.id
         })

        expect(commentRepository.comments.find(index => index.id === commment.id) ).toBeUndefined()
        expect(commentRepository.comments).toHaveLength(0)
    })

    it('shold not be able to delete a comment with invalid userId, recipeId or commentId.', async()=>{
    await expect(
    sut.delete({
      userId: randomUUID(),
      recipeId: randomUUID(),
      commentId: randomUUID(),
    })
    ).rejects.toBeInstanceOf(Error)
    })

})