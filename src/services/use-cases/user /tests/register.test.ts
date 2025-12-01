import { UserAlreadyExistsError } from "../../../errors/user-alreadyy-exists-erros";
import { InMemoryUserRepository } from "../../../../repositories/in-memory-repository/in-memory-user-repository";
import { RegisterUseCase } from "../register";
import { describe, expect, it, beforeEach } from "vitest";

let usersRepository: InMemoryUserRepository
let sut: RegisterUseCase

describe('Register Use Case', ()=>{
    beforeEach(()=>{
        usersRepository = new InMemoryUserRepository()
        sut = new RegisterUseCase(usersRepository)
    })
   
    it('should be able to register a new user.', async()=>{
        const { user } = await sut.create({
            name:'Alex',
            email:'exampleOne@gmail.com',
            password:'2597252'
        })
        expect(user.id).toEqual(expect.any(String))
    })

    it('should not be able to register user with same email.', async()=>{
        await sut.create({
            name:'Alex',
            email:'exampleTwo@gmail.com',
            password:'85422534'
        })

        await expect(()=>
            sut.create({
                name:'Alex',
                email: 'exampleTwo@gmail.com',
                password:'41432525'
            })
        ).rejects.toBeInstanceOf(UserAlreadyExistsError)
    })

})