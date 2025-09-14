export function isTag(value: string){
    const hashtagRegex = /^#[A-Za-zА-Яа-я0-9_]{2,140}$/;
    return hashtagRegex.exec(value);
}

export function isPostTitle(value: string){
    const titleRegex = /^(?=.{10,100}$)[A-Za-zА-Яа-яЁё0-9][A-Za-zА-Яа-яЁё0-9\s.,!?-]*$/;
    return titleRegex.exec(value);
}

export function isContentEmpty(content: string){
    return content.length < 300;
}