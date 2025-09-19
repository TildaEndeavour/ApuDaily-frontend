const SignUpForm = () => {

    return (
        <form
            className="w-90 h-fit mt-6 flex flex-col items-center gap-4">
            <h1 className="text-lg font-bold">Sign-up</h1>
            <input
                name="usernameOrEmail" placeholder="Enter your nickname"
                className="border-1 h-fit p-4 ml-4 rounded-3xl"
            />
            <input
                name="email" placeholder="Enter your email"
                className="border-1 h-fit p-4 ml-4 rounded-3xl"
            />
            <input
                name="password" placeholder="Enter your password"
                className="border-1 h-fit p-4 ml-4 rounded-3xl"
            />
            <input
                name="confirmPassword" placeholder="Confirm your password"
                className="border-1 h-fit p-4 ml-4 rounded-3xl"
            />
            <button className="border-1 h-fit p-4 ml-4 rounded-3xl hover:bg-gray-100">
                Register
            </button>
        </form>
    );
}

export default SignUpForm;