import { Navigate } from "react-router-dom";
import Login from "../views/Login";


export default function PublicRoutes(){
    return [
        {path:"/",element:<Login />},
        {path:"*", element: <Navigate to="/" replace />}
    ]
}