import { User } from "@/domain/entities/user";
import { UsersRepository } from "../users-repository";
import { FindEmailByUserDTO } from "@/domain/dtos/user/find-email-by-user-dto";
import { CreateUserDTO } from "@/domain/dtos/user/create-user-dto";
import { FindUserIdDTO } from "@/domain/dtos/user/find-user-id-dto";

export class InMemoryUserRepository implements UsersRepository{
  public users: User[] = []

  async create(data: CreateUserDTO ): Promise<User>{
    const user: User = {
        id: crypto.randomUUID(),
        name:data.name || null,
        email: data.email,
        password:data.password,
        created_at:new Date()
    }

    this.users.push(user)
    return user
  }

   async findByEmail(email: FindEmailByUserDTO) : Promise<User | null>{
          const user = this.users.find((org=> org.email === email.email))

          if (!user){
               return null
          }

          return user
     }

   async findById(id: FindUserIdDTO): Promise<User | null>{
          const user = this.users.find((org=> org.id === id.id))

          if (!user){
               return null
          }

          return user
     
   }
}