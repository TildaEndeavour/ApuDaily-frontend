import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import {loader as postLoader} from "../src/pages/Posts.tsx";
import {loader as categoryLoader} from "../src/model/Category.ts";
import HomePage from "./pages/Home.tsx";
import RootLayout from "./components/RootLayout.tsx";
import Posts from "./pages/Posts.tsx";
import NewPost from "./pages/NewPost.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";

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

  return <RouterProvider router={router} />;
}

export default App
