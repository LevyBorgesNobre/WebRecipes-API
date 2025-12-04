import { Prisma, UserProfile } from "generated/prisma/client"

export interface UserProfileRepository {
     create(data: Prisma.UserProfileCreateInput):Promise<UserProfile>
}