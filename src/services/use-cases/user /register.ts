import { User } from "@/domain/entities/user";
import { UsersRepository } from "@/repositories/users-repository";
import { UserAlreadyExistsError } from "../../errors/user-alreadyy-exists-erros";
import { hash } from "bcryptjs";

interface RegisterUseCaseRequest {
    name:               string;
    email:              string;
    password:           string;
}

interface RegisterUseCaseResponse {
   user: User
}

export class RegisterUseCase{
    constructor(
       private usersRepository: UsersRepository    
    ){}

    async create({
    name,
    email,
    password
    }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse>{

       const userWithSameEmail = await this.usersRepository.findByEmail({email: email})

       if(userWithSameEmail){
        throw new UserAlreadyExistsError()
       }

       const password_hash = await hash(password, 6)

       const user = await this.usersRepository.create({
         name,
         email,
         password: password_hash
       })
       
       return {
         user
       }
    }
}