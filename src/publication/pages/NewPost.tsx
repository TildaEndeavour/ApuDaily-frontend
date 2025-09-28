import {type FormEvent, useState} from "react";
import PostForm from "../components/PostForm.tsx";
import type {Post} from "../model/Post.ts";
import {validatePostForm} from "../services/validation.ts";
import type {FormValidator} from "../../shared/model/FormValidator.ts";
import type {PostCreateRequestDto} from "../model/dto/PostCreateRequestDto.ts";
import {uploadPost, uploadTagsToServer} from "../services/requests.ts";
import {useNavigate} from "react-router-dom";
import {getUserDetails} from "../../auth/services/auth.ts";
import type User from "../../auth/model/User.ts";
import {useAuth} from "../../auth/providers/AuthProvider.tsx";
import ModalContainer from "../../shared/components/ModalContainer.tsx";
import PostDetails from "./PostDetails.tsx";
import type Tag from "../model/Tag.ts";

const NewPost = () => {

    const [post, setPost] = useState<Post>({
        id: null,
        user: null,
        thumbnail: null,
        title: "",
        description: "",
        content: "",
        category: null,
        tags: [],
        createdAt: null,
        updatedAt: null
    });
    const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);
    const [errors, setErrors] = useState<FormValidator>({
        isValid: false,
        messages: {}
    });
    const navigate = useNavigate();
    const {accessToken} = useAuth();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const postFormValidator = validatePostForm(post);
        setErrors(postFormValidator);
        if(!postFormValidator.isValid){
            return;
        }

        let author: User | null = null;

        if(accessToken){
            try {
                const authorResponse = await getUserDetails(accessToken);
                if (authorResponse.status === 200) {
                    author = authorResponse.body;
                }
            } catch (e) {
                console.error('User loading error', e);
            }
        }

        let postTagsId: number[] = [];

        if (post.tags) {
            const uploadTagsResponse = await uploadTagsToServer(post.tags);
            if (uploadTagsResponse) {
                postTagsId = uploadTagsResponse.map((tag: Tag) => tag.id);
            }
        }

        const request: PostCreateRequestDto = {
            authorId: author ? author.id : null,
            thumbnailId: post.thumbnail?.id,
            title: post.title,
            description: post.description,
            content: post.content,
            categoryId: post.category!.id,
            tagsId: postTagsId
        }

        console.log(request);

        const response = await uploadPost(request);
        if(response.status === 200) navigate('/posts');
    }

    const handlePreview = () => {
        const postFormValidator = validatePostForm(post);
        setErrors(postFormValidator);
        if(postFormValidator.isValid) setIsPreviewOpen(true)
    }
    
    return (
        <div className="w-full h-screen pt-16 flex flex-col items-center">
            <PostForm
                post={post}
                errors={errors}
                onChangePost={setPost}
                onSubmitPost={handleSubmit}
                onPreview={handlePreview}
            />
            <ModalContainer isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)}>
                <div className="h-240 my-auto overflow-y-auto">
                    <PostDetails postPreview={post}/>
                </div>
            </ModalContainer>
        </div>
    );
}


export default NewPost;