import { createBrowserRouter } from "react-router-dom";
import Main from "./../Layout/Main/Main";
import Home from "./../Components/Home/Home";
import Blog from "../Components/Blog/Blog";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/blog",
        element: <Blog></Blog>,
      },
    ],
  },
]);

export default router;
