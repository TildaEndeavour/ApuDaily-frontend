import type {Post} from "../model/Post.ts";
import {useLoaderData, useNavigate} from "react-router-dom";
import DOMPurify from "dompurify";
import {Pencil, Tag, Trash} from "lucide-react";
import {type FormEvent, useEffect, useState} from "react";
import {getUserDetails} from "../../auth/services/auth.ts";
import {useAuth} from "../../auth/providers/AuthProvider.tsx";
import type User from "../../auth/model/User.ts";
import EditPostInvite from "../components/EditPostInvite.tsx";
import ModalCard from "../../shared/components/ModalCard.tsx";
import PostForm from "../components/PostForm.tsx";
import type {FormValidator} from "../../shared/model/FormValidator.ts";
import {validatePostForm} from "../services/validation.ts";
import type {PostCreateRequestDto} from "../model/dto/PostCreateRequestDto.ts";
import {deletePost, updatePost, uploadTagsToServer} from "../services/requests.ts";
import type {PostUpdateRequestDto} from "../model/dto/PostUpdateRequestDto.ts";
import type {PostDeleteRequestDto} from "../model/dto/PostDeleteRequestDto.ts";

const PostDetails: React.FC<{postPreview : Post | null}>= ({postPreview}) => {

    const response = useLoaderData();
    const [user, setUser] = useState<User>(null);
    const [content, setContent]= useState<Post>((postPreview === null) ? response.body : postPreview);
    const [isEdit, setIsEdit] = useState(false);
    const [errors, setErrors] = useState<FormValidator>({
        isValid: false,
        messages: {}
    });
    const { accessToken } = useAuth();
    const navigate = useNavigate();

    const handleDeletePost = async () => {
        const request: PostDeleteRequestDto = {
            userId: user.id,
            postId: content.id!
        }

        await deletePost(request);
        navigate('/posts');
    }

    const handleUpdatePost = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const postFormValidator = validatePostForm(content);
        setErrors(postFormValidator);
        if(!postFormValidator.isValid){
            return;
        }

        let postTagsId: number[] = [];

        if (content.tags) {
            const uploadTagsResponse = await uploadTagsToServer(content.tags);
            if (uploadTagsResponse) {
                postTagsId = uploadTagsResponse.map(tag => tag.id);
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

        console.log(request);

        console.log("Пытаюсь обновить публикацию");
         await updatePost(request);
         console.log("Публикация обновлена");
    }

    useEffect(() => {
        if(!accessToken) return;
        (async () => {
            try {
                const response = await getUserDetails(accessToken);

                if (response.status === 200) {
                    setUser(response.body);
                }
            } catch (error) {
                console.log(error);
            }
        })();
    }, [] );

    return(
        <div className="w-2/3 h-200 flex flex-row gap-2">
            <div>
                <article className="px-16 py-12 animate-fade-down animate-once animate-duration-1000 animate-ease-in-out animate-alternate animate-fill-both
                            bg-gray-100 rounded-3xl shadow-2xl">

                    <section className="flex flex-row justify-between mb-8">
                        <h4 className="font-bold">{content.category?.name}</h4>
                        <span>
                {new Date(content.createdAt).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    timeZone: 'UTC'
                })}
            </span>
                    </section>
                    <h1 className="mb-6 ">
                        {content.title}
                    </h1>
                    <div className="h-fit ql-editor"
                         dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content.content) }}>
                    </div>
                </article>
                <section className="px-4 py-4 my-5 flex flex-row gap-4 animate-fade-down animate-once animate-duration-1000 animate-ease-in-out animate-alternate animate-fill-both
                 bg-gray-100 rounded-3xl shadow-2xl">
                    {content.tags && content.tags.map(tag => {
                        return <span key={tag.name} className="p-2 flex flex-row gap-2 bg-gray-100 rounded-3xl border-1"><Tag size={24} strokeWidth={1}/>{tag.name}</span>
                    })}
                </section>
            </div>
            {user && user.id === content.user?.id && (
                <section className="flex flex-col gap-2">
                    <EditPostInvite onSelect={() => setIsEdit(true)}/>
                    <div className="p-8 w-fit h-fit shadow-2xl bg-gray-100 rounded-2xl animate-fade-left"
                         onClick={() => handleDeletePost()}
                    >
                        <Trash size={36} strokeWidth={1}/>
                    </div>
                </section>
            )}
            <ModalCard isOpen={isEdit} onClose={() => setIsEdit(false)}>
                    <PostForm
                        post={content}
                        errors={errors}
                        onChangePost={setContent}
                        onSubmitPost={handleUpdatePost}
                    />
            </ModalCard>
        </div>
    );
}

export default PostDetails;