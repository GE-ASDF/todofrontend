import { Navigate } from "react-router-dom";
import Template from "../views/Template";
import Today from "../views/app/pages/Today";
import { todayTasksLoader } from "../Loaders/todayTasksLoader";
import StickyWall from "../views/app/pages/StickyWall";
import All from "../views/app/pages/All";
import EditTask from "../views/app/pages/EditTask";
import ByPriority from "../views/app/pages/ByPriority";
import Dashboard from "../Components/Views/Home/Dashboard";

export default function PrivateRoutes(){
    return [
        {
            path:"/app",
            element:<Template />,
            children:[
                {
                    path:"dashboard",
                    element:<Dashboard />,
                    children:[
                        {
                            path:"edittask/:id",
                            element:<EditTask />
                        }
                    ]
                },
                {
                    path:"today",
                    element:<Today />,
                    loader: todayTasksLoader,
                    children:[
                        {
                            path:"edittask/:id",
                            element:<EditTask />
                        }
                    ]
                },
                {
                    path:"all",
                    element:<All />,
                    children:[
                        {
                            path:"edittask/:id",
                            element:<EditTask />
                        }
                    ]
                },
                {
                    path:"stickywall",
                    element:<StickyWall />,
                },
                {
                    path:"bypriority",
                    element:<ByPriority />,
                    children:[
                        {
                            path:"edittask/:id",
                            element:<EditTask />
                        }
                    ]
                },           
            ]
        },
        {path:"*", element: <Navigate to="/app/dashboard" replace />}
    ]
}