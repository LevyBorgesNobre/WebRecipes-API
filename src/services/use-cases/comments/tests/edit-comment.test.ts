import { InMemoryCommentRepository } from "../../../../repositories/in-memory-repository/in-memory-comment-repository";
import { InMemoryRecipeRepository } from "../../../../repositories/in-memory-repository/in-memory-recipe-repository";
import { InMemoryUserRepository } from "../../../../repositories/in-memory-repository/in-memory-user-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { EditCommentUseCase } from "../edit-comment";
import { randomUUID } from "crypto";

let usersRepository: InMemoryUserRepository
let recipeRepository: InMemoryRecipeRepository
let commentRepository: InMemoryCommentRepository
let sut: EditCommentUseCase

describe('Edit Recipe Use Case.', ()=>{
   beforeEach(()=>{
    usersRepository = new InMemoryUserRepository()
    recipeRepository = new InMemoryRecipeRepository()
    commentRepository = new InMemoryCommentRepository()
    sut = new EditCommentUseCase(recipeRepository, commentRepository)
   })

   it('should be able to edit a comment.', async()=>{
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
         userId: user.id
       })

       const comment = await commentRepository.create({
          userId: user.id,
          recipesId: recipe.id,
          comment:'primeiro comentario'
       })

    const commentUpdated = await sut.update({
         userId: user.id,
          recipeId: recipe.id,
          commentId: comment.id,
          data: {
          comment: 'first comment',
         },
        })
        
        expect(commentUpdated.comment.comment).toEqual('first comment')
   })

   it('should not be able to edit a comment with invalid userId, recipeId or commentId.', async()=>{
     await expect(()=>
      sut.update({
        userId:randomUUID(),
        recipeId:randomUUID(),
        commentId:randomUUID(),
        data:{
            comment:"terceiro comentario"
        }
      })
    ).rejects.instanceof(Error)
   })

})