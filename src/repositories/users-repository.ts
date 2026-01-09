import { CreateUserDTO } from "@/domain/dtos/user/create-user-dto"
import { FindEmailByUserDTO } from "@/domain/dtos/user/find-email-by-user-dto"
import { FindUserIdDTO } from "@/domain/dtos/user/find-user-id-dto"
import { User } from "@/domain/entities/user"

export interface UsersRepository {
    create(data: CreateUserDTO):Promise<User>
    findByEmail(email: FindEmailByUserDTO): Promise<User | null>
    findById(id: FindUserIdDTO): Promise<User | null>
}