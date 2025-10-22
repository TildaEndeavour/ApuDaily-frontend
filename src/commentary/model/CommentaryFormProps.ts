import type {FormEvent} from "react";
import type {CommentaryCreateRequestDto} from "./dto/CommentaryCreateRequestDto.ts";

export interface CommentaryFormProps{
    postId: number,
    parentCommentId: number | null,
    onSubmit: (e: FormEvent<HTMLFormElement>, requestDto: CommentaryCreateRequestDto) => void;
}