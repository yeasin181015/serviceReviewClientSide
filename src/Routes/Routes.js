import { createBrowserRouter } from "react-router-dom";
import Main from "./../Layout/Main/Main";
import Home from "./../Components/Home/Home";
import Blog from "../Components/Blog/Blog";
import Login from "../Components/Login/Login";
import Register from "../Components/Register/Register";
import ServiceDetails from "../Components/ServiceDetails/ServiceDetails";
import AllService from "../Components/AllServices/AllService";
import PrivateRoute from "./PrivateRoute";
import MyReviews from "../Components/MyReviews/MyReviews";
import Update from "./../Components/MyReviews/Update";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        loader: () => fetch("http://localhost:5000/"),
      },
      {
        path: "/blog",
        element: <Blog></Blog>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },

      {
        path: "/service/:id",
        element: <ServiceDetails></ServiceDetails>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/service/${params.id}`),
      },
      {
        path: "/all-services",
        element: <AllService></AllService>,
        loader: () => fetch("http://localhost:5000/all-services"),
      },
      {
        path: "/myreviews",
        element: (
          <PrivateRoute>
            <MyReviews></MyReviews>
          </PrivateRoute>
        ),
      },
      {
        path: "/update/:id",
        element: <Update></Update>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/myreviews/${params.id}`),
      },
    ],
  },
]);

export default router;
