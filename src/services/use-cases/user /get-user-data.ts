import { UsersRepository } from "@/repositories/users-repository";
import { User } from "@/domain/entities/user";

interface GetUserDataUseCaseRequest{
    id: string
}

interface GetUserDataUseCaseResponse{
    user: User
}

export class GetUserDataUseCase {
    constructor(
        private usersRepository: UsersRepository
    ){}

   async execute({
    id
   }: GetUserDataUseCaseRequest): Promise<GetUserDataUseCaseResponse>{
    const user = await this.usersRepository.findById({id: id})

    if(!user){
       throw new Error('User not found')
    }

    return {
        user
    }
    
    }
}