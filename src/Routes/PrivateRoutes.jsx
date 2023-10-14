import { Navigate } from "react-router-dom";
import Template from "../views/Template";
import Today from "../views/app/pages/Today";
import { todayTasksLoader } from "../Loaders/todayTasksLoader";

export default function PrivateRoutes(){
    return [
        {
            path:"/app",
            element:<Template />,
            children:[
                {
                    path:"today",
                    element:<Today />,
                    loader: todayTasksLoader,
                }
            ]
        },
        {path:"*", element: <Navigate to="/app" replace />}
    ]
}