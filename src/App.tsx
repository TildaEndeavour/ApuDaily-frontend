import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import {loader as postLoader} from "./publication/pages/Posts.tsx";
import {loader as categoryLoader} from "./publication/model/Category.ts";
import HomePage from "./home/pages/Home.tsx";
import RootLayout from "./shared/components/RootLayout.tsx";
import Posts from "./publication/pages/Posts.tsx";
import NewPost from "./publication/pages/NewPost.tsx";
import ErrorPage from "./shared/pages/ErrorPage.tsx";
import AuthProvider from "./auth/providers/AuthProvider.tsx";

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
                loader: categoryLoader,
                errorElement: <ErrorPage/>
            }
        ]}
  ]);

  return (
      <AuthProvider>
          <RouterProvider router={router} />;
      </AuthProvider>
  );
}

export default App
