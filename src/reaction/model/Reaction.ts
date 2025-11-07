import type {UserProfile} from "../../user/model/UserProfile.ts";

export interface Reaction{
    id: number,
    targetTypeId: number,
    entityId: number,
    isUpvote: boolean,
    user: UserProfile,
    createdAt: Date
}