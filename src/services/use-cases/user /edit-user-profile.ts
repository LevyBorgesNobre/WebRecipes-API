import { UserProfile } from "generated/prisma/client";
import { UsersRepository } from "@/repositories/users-repository";
import { UserProfileRepository } from "@/repositories/user-profile-repository";
import { ResourceNotFoundError } from "../../errors/resource-not-found-error";

interface EditUserProfileUseCaseRequest {
  id:                   string;
  bio:                  string;
  location:             string;
  experience_level:     string;  
  favorite_ingredient:  string;
  cooking_specialities: string;

}

interface EditUserProfileUseCaseResponse {
    userProfile: UserProfile
}

export class EditUserProfileUseCase{
    constructor(
       private usersRepository: UsersRepository,
       private userProfileRepository: UserProfileRepository
    ){}

    async execute({
    id,
    bio,
    location,
    experience_level,
    favorite_ingredient,
    cooking_specialities     
    }: EditUserProfileUseCaseRequest): Promise<EditUserProfileUseCaseResponse>{
     
        const user = await this.usersRepository.findById(id)

        if(!user){
            throw new ResourceNotFoundError()
        }

        const userProfile = await this.userProfileRepository.create({
           bio,
           location,
           experience_level,
           favorite_ingredient,
           cooking_specialities,
           user: {
            connect: { id }
           }
        })

        return {
            userProfile
        }
    }
}