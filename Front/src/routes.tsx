import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/:userName/*",
    element: <Home />,
  },
  {
    path:"/sing-up",
    element:<Register/>,
  },
]);
