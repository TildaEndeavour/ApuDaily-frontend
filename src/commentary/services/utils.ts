import type {CommentaryResponseDto} from "../model/dto/CommentaryResponseDto.ts";
import {loadUserProfileById} from "../../publication/services/requests.ts";
import type {UserProfile} from "../../publication/model/UserProfile.ts";
import {loadCommentariesByFilter} from "./loaders.ts";

export const buildCommentary = async (responseDto: CommentaryResponseDto) => {
    const profile: UserProfile = await loadUserProfileById(responseDto.userId);
    const parentCommentary = await loadCommentariesByFilter(
        {id: responseDto.parentCommentaryId, postId: null, parentCommentaryId: null, userId: null}
    );
    const replies = await loadCommentariesByFilter(
        {id: null, postId: null, parentCommentaryId: responseDto.id, userId: null}
    );

}