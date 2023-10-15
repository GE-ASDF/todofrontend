import { Navigate } from "react-router-dom";
import Template from "../views/Template";
import Today from "../views/app/pages/Today";
import { todayTasksLoader } from "../Loaders/todayTasksLoader";
import StickyWall from "../views/app/pages/StickyWall";
import All from "../views/app/pages/All";

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
                },
                {
                    path:"all",
                    element:<All />,
                },
                {
                    path:"stickywall",
                    element:<StickyWall />,
                }
            ]
        },
        {path:"*", element: <Navigate to="/app" replace />}
    ]
}