import type {Post} from "../model/Post.ts";
import {useLoaderData, useNavigate} from "react-router-dom";
import {Pencil, Trash} from "lucide-react";
import type {Tag} from "../model/Tag.ts";
import React, {type FormEvent, useState} from "react";
import ModalContainer from "../../shared/components/ModalContainer.tsx";
import PostForm from "../components/PostForm.tsx";
import type {FormValidator} from "../../shared/model/FormValidator.ts";
import {validatePostForm} from "../services/validation.ts";
import {deletePost, updatePost, uploadTagsToServer} from "../services/requests.ts";
import type {PostUpdateRequestDto} from "../model/dto/PostUpdateRequestDto.ts";
import type {PostDeleteRequestDto} from "../model/dto/PostDeleteRequestDto.ts";
import ConfirmModal from "../../shared/components/ConfirmModal.tsx";
import CommentarySection from "../../commentary/components/CommentarySection.tsx";
import PostContent from "../components/PostContent.tsx";
import {useAuth} from "../../auth/hooks/useAuth.ts";

const PostDetails: React.FC<{postPreview : Post | null}>= ({postPreview}) => {

    const {user} = useAuth();
    const loader = useLoaderData();
    const [content, setContent] = useState<Post>((postPreview === null) ? loader.post : postPreview);
    const [isEdit, setIsEdit] = useState(false);
    const [isPostDeleting, setIsPostDeleting] = useState(false);
    const [errors, setErrors] = useState<FormValidator>({
        isValid: false,
        messages: {}
    });
    const navigate = useNavigate();

    const handleDeletePost = async () => {
        const request: PostDeleteRequestDto = {
            userId: user?.id,
            postId: content.id!
        }

        await deletePost(request);
        navigate('/posts');
    }

    const handleUpdatePost = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const postFormValidator = validatePostForm(content);
        setErrors(postFormValidator);
        if(!postFormValidator.isValid) return;


        let postTagsId: number[] = [];

        if (content.tags) {
            const uploadTagsResponse = await uploadTagsToServer(content.tags);
            if (uploadTagsResponse) {
                postTagsId = uploadTagsResponse.map((tag: Tag) => tag.id);
            }
        }

        const request: PostUpdateRequestDto = {
            postId: content.id!,
            authorId: content.user?.id,
            thumbnailId: content.thumbnail?.id,
            title: content.title,
            description: content.description,
            content: content.content,
            categoryId: content.category!.id,
            tagsId: postTagsId
        }

        await updatePost(request);
        setIsEdit(false);
    }

    return(
        <div className="w-360 mx-auto flex flex-row gap-2">
            <section className="mt-10 flex flex-col gap-2">
                <PostContent content={content}/>
                <h1 className="animate-fade-down">
                    {content.commentariesCount}{" "}
                    {content.commentariesCount === 1 ? "Commentary" : "Commentaries"}
                </h1>
                <CommentarySection postId={content.id!}/>
            </section>
            {user && user.id === content.user?.id && (
                <section className="flex flex-col gap-2 mt-10">
                    <div className="p-8 w-fit h-fit shadow-2xl bg-gray-100 hover:bg-gray-200 rounded-2xl animate-fade-left"
                         onClick={() => setIsEdit(true)}
                    >
                        <Pencil size={36} strokeWidth={1}/>
                    </div>
                    <div className="p-8 w-fit h-fit shadow-2xl bg-gray-100 hover:bg-gray-200 rounded-2xl animate-fade-left"
                         onClick={() => setIsPostDeleting(true)}
                    >
                        <Trash size={36} strokeWidth={1}/>
                    </div>
                </section>
            )}
            <ModalContainer isOpen={isEdit} onClose={() => setIsEdit(false)}>
                <PostForm
                    post={content}
                    errors={errors}
                    onChangePost={setContent}
                    onSubmitPost={handleUpdatePost}
                    onPreview={null}
                />
            </ModalContainer>
            <ModalContainer isOpen={isPostDeleting} onClose={() => setIsPostDeleting(false)}>
                <ConfirmModal
                    question="Do you really want to delete this post?"
                    onConfirm={() => handleDeletePost()}
                    onCancel={() => setIsPostDeleting(false)}
                />
            </ModalContainer>
        </div>
    );
}

export default PostDetails;