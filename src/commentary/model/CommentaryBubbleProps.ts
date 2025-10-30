import type {Commentary} from "./Commentary.ts";
import type {CommentaryCreateRequestDto} from "./dto/CommentaryCreateRequestDto.ts";
import type {CommentaryUpdateRequestDto} from "./dto/CommentaryUpdateRequestDto.ts";

export interface CommentaryBubbleProps{
    commentary: Commentary,
    onSubmitReply: (reply: CommentaryCreateRequestDto) => void,
    onUpdateCommentary: (request: CommentaryUpdateRequestDto) => void,
    onDeleteCommentary: (comment: Commentary) => void
}