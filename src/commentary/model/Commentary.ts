import type {UserProfile} from "../../publication/model/UserProfile.ts";

export interface Commentary{
    id: number,
    postId: number,
    parentCommentary: Commentary | null,
    user: UserProfile,
    content: string,
    replies: Commentary[] | null,
    createdAt: Date,
    updatedAt: Date
}