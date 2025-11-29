import { Prisma, User } from "generated/prisma/client"

export interface UsersRepository {
    create(data: Prisma.UserCreateInput):Promise<User>
}