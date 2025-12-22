import { InMemoryUserRepository } from "../../../../repositories/in-memory-repository/in-memory-user-repository";
import { describe,it, beforeEach, expect } from "vitest";
import { EditUserProfileUseCase } from "../edit-user-profile";
import { InMemoryUserProfileRepository } from "../../../../repositories/in-memory-repository/in-memory-user-profile-repository";
import { hashSync } from "bcryptjs";
import { randomUUID } from "crypto";
import { ResourceNotFoundError } from "../../../errors/resource-not-found-error";

let usersRepository: InMemoryUserRepository
let userProfileRepository:InMemoryUserProfileRepository
let sut: EditUserProfileUseCase

describe('Register Use Case', ()=>{
    beforeEach(()=>{
        usersRepository = new InMemoryUserRepository()
        userProfileRepository = new InMemoryUserProfileRepository()
        sut = new EditUserProfileUseCase(usersRepository, userProfileRepository)
    })
   

    it('should be able to edit a user profile', async()=>{
      const user =  await usersRepository.create({
           id: randomUUID(),
           name: "John Doe",
           email: "johndoe@example.com",
           password: String(hashSync('hassadasdahdaSenha123', 6)),
         })

        const initialProfile = await userProfileRepository.create({
            id:user.id,
            bio: "Apaixonado por criar receitas.",
            location: "Desconhecido",
            experience_level: "iniciante",
            favorite_ingredient: "sal",
            cooking_specialities: "fritar ovo",
            user: { connect: { id: user.id } },
           });

        const { userProfile } = await sut.execute(({
           id:user.id,
           bio: initialProfile.bio,
           location: "Brasil",
           experience_level: "intermediário",
           favorite_ingredient: "sal de parrilha",
           cooking_specialities: "churrasco"
         }))

           expect(userProfile.id).toEqual(initialProfile.id);
    })

    it('should not be able to create a user profile with invalid user id', async()=>{
       
       await usersRepository.create({
           id: randomUUID(),
           name: "John Doe",
           email: "johndoe@example.com",
           password: String(hashSync('hassadasdahdaSenha123', 6)),
       })

       await expect(sut.execute({
       id: 'invalid id',
       bio: 'Apaixonado por criar receitas',
       location: "Brasil",
       experience_level: "intermediário",
       favorite_ingredient: "sal de parrilha",
       cooking_specialities: "churrasco"
      })).rejects.toBeInstanceOf(ResourceNotFoundError);
    })

})