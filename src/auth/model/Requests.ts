export class LoginRequest {
    usernameOrEmail: string;
    password: string;

    constructor(usernameOrEmail: string, password: string) {
        this.usernameOrEmail = usernameOrEmail;
        this.password = password;
    }
}

export class SignUpRequest {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;

    constructor(username: string, email: string, password: string, confirmPassword: string) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.confirmPassword = confirmPassword;
    }
}