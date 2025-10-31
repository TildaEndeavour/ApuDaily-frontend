export interface SignUpRequestDto {
    username: string;
    email: string;
    timezoneId: number;
    password: string;
    confirmPassword: string;
}