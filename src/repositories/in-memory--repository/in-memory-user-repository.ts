import { User } from "generated/prisma/client";
import { Prisma } from "generated/prisma/client";

export class InMemoryUserRepository {
  public users: User[] = []

  async create(data: Prisma.UserCreateInput ): Promise<User>{
    const user: User = {
        id: crypto.randomUUID(),
        name:data.name,
        email: data.email,
        bio: data.bio,
        location: data.location,
        experience_level: data.experience_level,
        created_atL:new Date()
    }

    this.users.push(user)
    return user
  }
}