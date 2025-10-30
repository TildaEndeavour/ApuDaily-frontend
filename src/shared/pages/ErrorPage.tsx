import {isRouteErrorResponse, useRouteError} from "react-router-dom";

const ErrorPage = () => {

    const error = useRouteError();

    let title = 'An error occurred!';
    let message = 'Something went wrong!';

    if (isRouteErrorResponse(error)) {
        title = 'Failed to load posts';
        message = error.statusText;
    } else if (error instanceof Error) {
        message = error.message;
    }

    return(
        <div className="h-48 w-96 p-4 border-gray-200 border rounded-3xl shadow-2xl bg-red-100 flex flex-col justify-center items-center mt-24">
            <h1 className="font-bold">{title}</h1>
            <p>{message}</p>
        </div>
    );
}

export default ErrorPage;