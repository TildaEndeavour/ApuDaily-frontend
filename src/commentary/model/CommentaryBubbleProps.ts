import type {Commentary} from "./Commentary.ts";
import type {CommentaryCreateRequestDto} from "./dto/CommentaryCreateRequestDto.ts";
import type {CommentaryDeleteRequestDto} from "./dto/CommentaryDeleteRequestDto.ts";

export interface CommentaryBubbleProps{
    commentary: Commentary,
    onSubmitReply: (reply: CommentaryCreateRequestDto) => void,
    onDeleteCommentary: (requestDto: CommentaryDeleteRequestDto) => void
}