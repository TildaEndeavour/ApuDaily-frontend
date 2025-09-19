class LoginRequestDto{
    usernameOrEmail: string;
    password: string;

    constructor(usernameOrEmail: string, password: string) {
        this.usernameOrEmail = usernameOrEmail;
        this.password = password;
    }
}

export default LoginRequestDto;