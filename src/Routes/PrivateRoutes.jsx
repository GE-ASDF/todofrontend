import { Navigate } from "react-router-dom";
import Template from "../views/Template";

export default function PrivateRoutes(){
    return [
        {
            path:"/app",
            element:<Template />,
            children:[
                {
                    path:"todaytasks",
                }
            ]
        },
        {path:"*", element: <Navigate to="/app" replace />}
    ]
}