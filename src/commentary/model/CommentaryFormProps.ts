import type {CommentaryCreateRequestDto} from "./dto/CommentaryCreateRequestDto.ts";

export interface CommentaryFormProps{
    postId: number,
    parentCommentId: number | null,
    onSubmit: (requestDto: CommentaryCreateRequestDto) => void;
}