import { Navigate } from "react-router-dom";
import Template from "../views/Template";
import Today from "../views/app/pages/Today";
export default function PrivateRoutes(){
    return [
        {
            path:"/app",
            element:<Template />,
            children:[
                {
                    path:"today",
                    element:<Today />
                }
            ]
        },
        {path:"*", element: <Navigate to="/app" replace />}
    ]
}