import { User } from "generated/prisma/client";
import { Prisma } from "generated/prisma/client";
import { UsersRepository } from "../users-repository";

export class InMemoryUserRepository implements UsersRepository{
  public users: User[] = []

  async create(data: Prisma.UserCreateInput ): Promise<User>{
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

   async findByEmail(email: string){
          const user = this.users.find((org=> org.email === email))

          if (!user){
               return null
          }

          return user
     }

   async findById(id: string){
          const user = this.users.find((org=> org.id === id))

          if (!user){
               return null
          }

          return user
     
   }
}