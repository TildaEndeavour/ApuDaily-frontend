import type {PostCreateRequestDto} from "../model/dto/PostCreateRequestDto.ts";
import type {FormValidator} from "../../shared/model/FormValidator.ts";

export function isTag(value: string){
    const hashtagRegex = /^#[A-Za-zА-Яа-я0-9_]{2,140}$/;
    return hashtagRegex.test(value);
}

export function isPostTitle(value: string){
    let message = '';
    const titleRegex = /^(?=.{10,100}$)[A-Za-zА-Яа-яЁё0-9][A-Za-zА-Яа-яЁё0-9\s.,!?-]*$/;
    if(!titleRegex.test(value)) message = 'The title contains prohibited characters.';
    return message;
}

export function isContentEmpty(content: string){
    let message = '';
    if (content.length < 300) message = 'Content is empty!';
    return message;
}

export function validatePostForm(form: PostCreateRequestDto): FormValidator{

    const validators = {
        title: isPostTitle(form.title),
        content: isContentEmpty(form.content)
    }

    /*
    const category = categories.filter(category => category.slug === formData.get("categoryId"));
    formData.set("categoryId", category[0].id.toString());

    const tags_: Tag[] = await loadTagsToServer(tags);
    formData.set("tagsId", tags_.map(tag => tag.id).toString());
    */

    return {
        isValid: Object.values(validators).every((error) => error === ''),
        messages: validators
    }

}