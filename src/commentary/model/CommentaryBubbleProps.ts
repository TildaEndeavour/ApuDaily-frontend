import type {Commentary} from "./Commentary.ts";
import type {CommentaryCreateRequestDto} from "./dto/CommentaryCreateRequestDto.ts";

export interface CommentaryBubbleProps{
    commentary: Commentary,
    onSubmitReply: (reply: CommentaryCreateRequestDto) => void,
    onDeleteCommentary: (comment: Commentary) => void
}