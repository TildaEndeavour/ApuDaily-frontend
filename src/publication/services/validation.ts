import type {FormValidator} from "../../shared/model/FormValidator.ts";
import type {Post} from "../model/Post.ts";
import type {Category} from "../model/Category.ts";

export function isTag(value: string){
    const hashtagRegex = /^#[A-Za-zА-Яа-я0-9_]{2,140}$/;
    return hashtagRegex.test(value);
}

export function isPostTitle(value: string){
    let message = '';
    const titleRegex = /^(?=.{10,100}$)[A-Za-zА-Яа-яЁё0-9][A-Za-zА-Яа-яЁё0-9\s.,!?-]*$/;
    if(!titleRegex.test(value)) message = 'The title contains prohibited characters.';
    if(value.length < 10) message = 'The title is too small';
    return message;
}

export function isContentEmpty(content: string){
    let message = '';
    if (content.length < 300) message = 'Too little content, check the minimum number of symbols.';
    return message;
}

export function isCategoryEmpty(category: Category | null){
    let message = '';
    if(!category) message = "Category isn't selected";
    return message;
}

export function validatePostForm(form: Post): FormValidator{

    const validators = {
        title: isPostTitle(form.title),
        content: isContentEmpty(form.content),
        category: isCategoryEmpty(form.category)
    }

    return {
        isValid: Object.values(validators).every((error) => error === ''),
        messages: validators
    }

}