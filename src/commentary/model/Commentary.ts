import type {UserProfile} from "../../publication/model/UserProfile.ts";
import type {CommentaryResponseDto} from "./dto/CommentaryResponseDto.ts";

export interface Commentary{
    id: number,
    postId: number,
    user: UserProfile,
    content: string,
    parentCommentary: CommentaryResponseDto | null,
    replies: CommentaryResponseDto[] | null
}