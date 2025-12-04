import { UserProfile } from "generated/prisma/client";
import { UserProfileCreateInput } from "generated/prisma/models";
import { UserProfileRepository } from "../user-profile-repository";
import { prisma } from '@/lib/prisma'

export class PrismaUserProfileRepository implements UserProfileRepository {
    async create(data: UserProfileCreateInput): Promise<UserProfile> {
       const user = await prisma.userProfile.upsert({
    where: {
      userId: data.user.connect?.id 
    },
    update: {
      ...data,             
    },
    create: {
      ...data,            
    }
  })

        return user
    }
    
}