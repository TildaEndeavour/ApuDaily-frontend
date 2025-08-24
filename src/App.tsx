import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import HomePage from "./pages/Home.tsx";
import RootLayout from "./components/RootLayout.tsx";
import Posts from "./pages/Posts.tsx";
import NewPost from "./pages/NewPost.tsx";

function App() {

  const router = createBrowserRouter([
      { path: '/',
        element: <RootLayout />,
        children: [
            {index: true, element: <HomePage/>},
            {path: "/posts", element: <Posts/>},
            {path: "/posts/new", element: <NewPost/>}
        ]}
  ]);

  return <RouterProvider router={router} />;
}

export default App
