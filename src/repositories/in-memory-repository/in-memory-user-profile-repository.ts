import { randomUUID } from "crypto";
import { UserProfile } from "@/domain/entities/user-profile";
import { UserProfileRepository } from "../user-profile-repository";
import { EditUserProfileDTO } from "@/domain/dtos/user-profile/edit-user-profile-dto";

export class InMemoryUserProfileRepository implements UserProfileRepository {

    public userProfile: UserProfile[]= []

   
    async create(data: EditUserProfileDTO): Promise<UserProfile> {
        const userId = data.userId;
       
    const existingIndex = this.userProfile.findIndex(
        profile => profile.userId === userId
    )

         if (existingIndex !== -1) {
        const existing = this.userProfile[existingIndex]

        const updateProfile = {
            ...existing,
            bio: data.bio ?? existing.bio,
            location: data.location ?? existing.location,
            experience_level: data.experience_level ?? existing.experience_level,
            favorite_ingredient: data.favorite_ingredient ?? existing.favorite_ingredient,
            cooking_specialities: data.cooking_specialities ?? existing.cooking_specialities,
        }

        this.userProfile[existingIndex] = updateProfile
        return updateProfile
    }

        const newProfile: UserProfile = {
            id: randomUUID(),
            bio: data.bio,
            location: data.location,
            experience_level: data.experience_level,
            favorite_ingredient: data.favorite_ingredient,
            userId: data.userId,
            cooking_specialities: data.cooking_specialities,
        }

        this.userProfile.push(newProfile)
        return newProfile
    }

}