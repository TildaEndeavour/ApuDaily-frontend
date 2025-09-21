import {type FormEvent, useState} from "react";
import PostForm from "../components/PostForm.tsx";
import type {Post} from "../model/Post.ts";
import {validatePostForm} from "../services/validation.ts";
import type {FormValidator} from "../../shared/model/FormValidator.ts";
import type {PostCreateRequestDto} from "../model/dto/PostCreateRequestDto.ts";
import {uploadPost} from "../services/requests.ts";
import {useNavigate} from "react-router-dom";

const NewPost = () => {

    const [post, setPost] = useState<Post>({
        id: null,
        author: null,
        thumbnail: null,
        title: "",
        description: "",
        content: "",
        category: null,
        tags: [],
        createdAt: null,
        updatedAt: null
    });
    const [errors, setErrors] = useState<FormValidator>({
        isValid: false,
        messages: {}
    });
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log(post);

        const postFormValidator = validatePostForm(post);
        setErrors(postFormValidator);
        if(!postFormValidator.isValid){
            return;
        }

        const request: PostCreateRequestDto = {
            thumbnailId: post.thumbnail?.id,
            title: post.title,
            description: post.description,
            content: post.content,
            categoryId: post.category!.id,
            tagsId: post.tags!.flatMap(tag => tag.id !== null ? [tag.id] : [])
        }

        const response = await uploadPost(request);
        if(response.status === 200) navigate('/posts');
    }
    
    return (
        <div className="w-screen h-screen flex flex-col items-center gap-4">
            <PostForm
                post={post}
                errors={errors}
                onChangePost={setPost}
                onSubmitPost={handleSubmit}
            />
        </div>
    );
}


export default NewPost;