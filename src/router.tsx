import { createBrowserRouter } from "react-router-dom";
import Home from "./layout/home";
import { Details } from "./layout/details";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/details/:id",
    element: <Details />,
  },
]);
