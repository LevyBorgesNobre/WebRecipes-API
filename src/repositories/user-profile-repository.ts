import { EditUserProfileDTO } from "@/domain/dtos/user-profile/edit-user-profile-dto"
import { UserProfile } from "@/domain/entities/user-profile"

export interface UserProfileRepository {
     create(data: EditUserProfileDTO):Promise<UserProfile>
}