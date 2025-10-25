import type {CommentaryCreateRequestDto} from "./dto/CommentaryCreateRequestDto.ts";
import type {CommentaryUpdateRequestDto} from "./dto/CommentaryUpdateRequestDto.ts";

export type CommentaryRequestDto = CommentaryCreateRequestDto & CommentaryUpdateRequestDto;

export interface CommentaryFormProps{
    postId: number,
    commentId: number | null,
    parentCommentId: number | null,
    content: string | null,
    onSubmit: (request: CommentaryRequestDto) => void
}