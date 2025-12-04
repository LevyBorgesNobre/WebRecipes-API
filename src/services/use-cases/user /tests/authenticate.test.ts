import { UserAlreadyExistsError } from "../../../errors/user-alreadyy-exists-erros";
import { InMemoryUserRepository } from "../../../../repositories/in-memory-repository/in-memory-user-repository";
import { describe, expect, it, beforeEach } from "vitest";
import { hashSync } from "bcryptjs";
import { AuthenticateUseCase } from "../authenticate"
import { InvalidCredentialsError } from "./../../../errors/invalid-credentials-error";

let usersRepository: InMemoryUserRepository
let sut: AuthenticateUseCase

describe('Register Use Case', ()=>{
    beforeEach(()=>{
        usersRepository = new InMemoryUserRepository()
        sut = new AuthenticateUseCase(usersRepository)
    })
   
    it('should be able to authenticate a user.', async()=>{
       await usersRepository.create({
        name: "John Doe",
        email: "johndoe@example.com",
        password: String(hashSync('hassadasdahdaSenha123', 6)),
        })
       
        const { user } = await sut.execute({
        email: "johndoe@example.com",
        password: "hassadasdahdaSenha123",
       })

       expect(user.id).toEqual(expect.any(String))
    })

    it('should not be able to authenticate with wrong email.', async()=>{
        await usersRepository.create({
        email: "johndoe@example.com",
        password: String(hashSync('hassadasdahdaSenha123', 6)),
        })

        await expect(()=>
            sut.execute({
                email: "johndoe@exampleOne.com",
                password:"hashdaseasdad"
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError)
    
    })

    it('should not be able to authenticate with wrong password', async()=>{
        await usersRepository.create({
        name: "John Doe",
        email: "johndoe@example.com",
        password: String(hashSync('hassadasdahdaSenha123', 6)),
        })

        await expect(()=>
            sut.execute({
                email: "johndoe@example.com",
                password:"hashd"
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError)
    
    })

})