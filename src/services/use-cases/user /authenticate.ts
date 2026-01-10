import { User } from "@/domain/entities/user";
import { UsersRepository } from "@/repositories/users-repository";
import { compare } from "bcryptjs";
import { InvalidCredentialsError } from "../../errors/invalid-credentials-error";

interface AuthenticateUseCaseRequest {
    email:              string;
    password:           string;
}

interface AuthenticateUseUseCaseResponse {
   user: User
}

export class AuthenticateUseCase{
    constructor(
       private usersRepository: UsersRepository    
    ){}

    async execute({
    email,
    password
    }: AuthenticateUseCaseRequest): Promise<AuthenticateUseUseCaseResponse>{

       const user = await this.usersRepository.findByEmail({email: email})

       if(!user){
        throw new InvalidCredentialsError()
       }

       const password_hash = await compare(password, user.password)
        
       if(!password_hash){
        throw new InvalidCredentialsError()
       }
     
       return {
         user
       }
    }
}