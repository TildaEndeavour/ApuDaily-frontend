import type {FormValidator} from "../../shared/model/FormValidator.ts";
import type {SignUpFormInputs} from "../model/SignUpFormInputs.ts";
import type {LoginFormInputs} from "../model/LoginFormInputs.ts";

const containsForbiddenChars = (str: string, forbiddenChars: string[]) => {
    for(const char of str){
        if(forbiddenChars.includes(char)){
            return true;
        }
    }
    return false;
}

export const validateUsername = (username: string) => {
    const invalidChars = [' ', ',', ';', '<', '>', '(', ')', '[', ']', '\\', '"', '@', '$', '%', '^', '*'];
    const minLength = 5;
    const maxLength = 20;
    let message = '';

    if(username !== null && username !== undefined){
        if(username.length < minLength || username.length > maxLength){
            message += 'Length should be between ' + minLength + ' and ' + maxLength + ' characters.';
        }

        if(containsForbiddenChars(username, invalidChars)){
            message += `Username contains forbidden characters: (${invalidChars.join(' ')})`;
        }
    }

    return message;
}

export const validateEmail = (email:string) => {
    const invalidChars = [' ', ',', ';', '<', '>', '(', ')', '[', ']', '\\', '"', '$', '%', '^', '*'];
    const minEmailLength = 7;
    const maxEmailLength = 60;
    let message = '';

    if (email !== null && email !== undefined) {
        if (email.includes('@')) {
            const [localPart, domain] = email.split('@', 2);

            if (!localPart.length || !domain.length) {
                message += 'Email should contain an "@" symbol with text before and after it. ';
            } else {
                const domainParts = domain.split('.');
                const isDomainInvalid = domainParts.length < 2
                    || domainParts.some(part => !part.length)
                    || domainParts[0].length === 0
                    || domainParts[domainParts.length - 1].length === 0;

                if (isDomainInvalid) {
                    message += 'Email should contain a "." symbol (not the first or last character). ';
                }
            }

            if (email.length < minEmailLength || email.length > maxEmailLength) {
                message += 'Email length should be between ' + minEmailLength + ' and ' + maxEmailLength + ' characters. ';
            }

            if (containsForbiddenChars(email, invalidChars)) {
                message += `Email contains forbidden characters: (${invalidChars.join(' ')}). `;
            }
        } else {
            message += 'Email should contain an "@" symbol. ';
        }
    }

    return message;
};

export const validateUsernameOrEmail = (title:string) => {
    let message = '';

    if (title !== null && title !== undefined) {
        if (title.includes('@')) {
            message += validateEmail(title);
        } else {
            message += validateUsername(title);
        }
    }

    return message;
};

export const validatePassword = (password:string) => {
    const invalidChars = [' ', ',', ';', '<', '>', '(', ')', '[', ']', '\\', '"', '$', '%', '^', '*'];
    const minLength = 10;
    const maxLength = 20;
    let message = '';

    if (password !== null && password !== undefined) {
        if (password.length < minLength || password.length > maxLength) {
            message += 'Length should be between ' + minLength + ' and ' + maxLength + ' characters. ';
        }

        if (containsForbiddenChars(password, invalidChars)) {
            message += `Password contains forbidden characters: (${invalidChars.join(' ')}). `;
        }
    }

    return message;
};

export const validateLoginForm = (inputs: LoginFormInputs): FormValidator => {
    const validators = {
        usernameOrEmail: validateUsernameOrEmail(inputs.usernameOrEmail),
        password: validatePassword(inputs.password),
    };

    return {
        isValid: Object.values(validators).every((error) => error === ''),
        messages: validators
    }
};

export const validateSignUpForm = (inputs: SignUpFormInputs): FormValidator => {
    const validators = {
        username: validateUsername(inputs.username),
        email: validateEmail(inputs.email),
        password: validatePassword(inputs.password),
        confirmPassword: (inputs.password !== inputs.confirmPassword) ? "Passwords don't match" : ''
    };

    return {
        isValid: Object.values(validators).every((error) => error === ''),
        messages: validators
    }
}