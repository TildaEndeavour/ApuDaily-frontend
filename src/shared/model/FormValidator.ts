export interface FormValidator{
    isValid: boolean;
    messages: Record<string, string>[]
}