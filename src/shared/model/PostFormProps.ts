import type {Post} from "../../publication/model/Post.ts";
import type {FormValidator} from "./FormValidator.ts";
import React, {type FormEvent} from "react";

export interface PostFormProps{
    post: Post,
    errors: FormValidator,
    onChangePost: React.Dispatch<React.SetStateAction<Post>>,
    onSubmitPost: (event: FormEvent<HTMLFormElement>) => void,
    onPreview: (() => void) | null
}