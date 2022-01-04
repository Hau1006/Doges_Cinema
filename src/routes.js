import { Navigate } from "react-router-dom";
import SignUp from "./components/Client/SignUp";
import SignIn from "./components/Common/SignIn";
import Admin from "./container/Admin";
import Index from "./container/Client/index";

export const routes = [
  {
    path: "/admin",
    exact: true,
    element: <Navigate to="/admin/user" />,
  },
  {
    path: "/admin/*",
    exact: false,
    element: <Admin />,
  },
  {
    path: "/sign-in",
    exact: true,
    element: <SignIn />,
  },
  {
    path: "/sign-up",
    exact: true,
    element: <SignUp />,
  },
  {
    path: "*",
    exact: false,
    element: < Index />
  },
];

