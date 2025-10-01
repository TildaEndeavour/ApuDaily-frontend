import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import HomePage from "./home/pages/Home.tsx";
import RootLayout from "./shared/components/RootLayout.tsx";
import Posts from "./publication/pages/Posts.tsx";
import NewPost from "./publication/pages/NewPost.tsx";
import ErrorPage from "./shared/pages/ErrorPage.tsx";
import AuthProvider from "./auth/providers/AuthProvider.tsx";
import {postDetailsLoader, postLoader} from "./publication/services/loaders.ts";
import PostDetails from "./publication/pages/PostDetails.tsx";

function App() {

  const router = createBrowserRouter([
      { path: '/',
        element: <RootLayout />,
        children: [
            {index: true, element: <HomePage/>},
            {
                path: "/posts",
                element: <Posts/>,
                loader: postLoader,
                errorElement: <ErrorPage/>
            },
            {
                path: "/posts/new",
                element: <NewPost/>,
                errorElement: <ErrorPage/>,
            },
            {
                path: "/posts/:id",
                element: <PostDetails postPreview={null}/>,
                loader: postDetailsLoader,
                errorElement: <ErrorPage/>
            }
        ]},
  ]);

  return (
      <AuthProvider>
          <RouterProvider
              router={router}
          />
      </AuthProvider>
  );
}

export default App
