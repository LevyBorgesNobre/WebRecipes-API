import { UsersRepository } from "../users-repository";
import { db } from '@/lib/prisma'
import { CreateUserDTO } from "@/domain/dtos/user/create-user-dto";
import { User } from "@/domain/entities/user";
import { FindEmailByUserDTO } from "@/domain/dtos/user/find-email-by-user-dto";
import { FindUserIdDTO } from "@/domain/dtos/user/find-user-id-dto";

export class PrismaUserRepository implements UsersRepository {
    async create(data: CreateUserDTO): Promise<User>{
        const user = await db.user.create({
            data,
        })
        return user
    }

    async findByEmail(email: FindEmailByUserDTO): Promise<User | null>{
        const user = await db.user.findUnique({
            where:{
                email: email.email,
            },
        })
        return user
    }

    async findById(id: FindUserIdDTO): Promise<User | null> {
        const user = await db.user.findUnique({
            where:{
                id: id.id
            }
        })
        return user
    }
}