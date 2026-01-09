import { UserProfileRepository } from "../user-profile-repository";
import { db } from '@/lib/prisma'
import { EditUserProfileDTO } from "@/domain/dtos/user-profile/edit-user-profile-dto";
import { UserProfile } from "@/domain/entities/user-profile";

export class PrismaUserProfileRepository implements UserProfileRepository {
    async create(data: EditUserProfileDTO): Promise<UserProfile> {
   const user = await db.userProfile.upsert({
    where: {
      userId: data.userId, 
    },
    update: {
      bio: data.bio,
      location: data.location,
      experience_level: data.experience_level,
      favorite_ingredient: data.favorite_ingredient,
      cooking_specialities: data.cooking_specialities,
    },
    create: {
      bio: data.bio,
      location: data.location,
      experience_level: data.experience_level,
      favorite_ingredient: data.favorite_ingredient,
      cooking_specialities: data.cooking_specialities,
      user: { connect: { id: data.userId } }
    }
  })

        return user
    }
    
}