import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import {Home} from "./pages/Home";
export const router = createBrowserRouter([
    {
        path:"/",
        element:<LoginPage/>,
    },
    {
        path:"/:userName/*",
        element:<Home/>
    }
])