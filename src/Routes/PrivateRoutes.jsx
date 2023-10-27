import { Navigate } from "react-router-dom";
import Template from "../views/Template";
import Today from "../views/app/pages/Today";
import { todayTasksLoader } from "../Loaders/todayTasksLoader";
import StickyWall from "../views/app/pages/StickyWall";
import All from "../views/app/pages/All";
import EditTask from "../views/app/pages/EditTask";
import ByPriority from "../views/app/pages/ByPriority";
import Dashboard from "../Components/Views/Home/Dashboard";
import RootBoundary from "../views/ErrorBoundary";
import RequireAuth from "../views/RequireAuth";

export default function PrivateRoutes(){
    return [
        {
            path:"/app",
            element:<RequireAuth><Template /></RequireAuth>,
            errorElement:<RootBoundary />,
            children:[
                {
                    path:"dashboard",
                    element:<Dashboard />,
                    errorElement:<RootBoundary />,
                    children:[
                        {
                            path:"edittask/:id",
                            element:<EditTask />,
                            errorElement:<RootBoundary />,
                        }
                    ]
                },
                {
                    path:"today",
                    element:<Today />,
                    loader: todayTasksLoader,
                    errorElement:<RootBoundary />,
                    children:[
                        {
                            path:"edittask/:id",
                            element:<EditTask />,
                            errorElement:<RootBoundary />,

                        }
                    ]
                },
                {
                    path:"all",
                    element:<All />,
                    errorElement:<RootBoundary />,
                    children:[
                        {
                            path:"edittask/:id",
                            element:<EditTask />,
                            errorElement:<RootBoundary />,

                        }
                    ]
                },
                {
                    path:"stickywall",
                    element:<StickyWall />,
                    errorElement:<RootBoundary />,

                },
                {
                    path:"bypriority",
                    element:<ByPriority />,
                    errorElement:<RootBoundary />,

                    children:[
                        {
                            path:"edittask/:id",
                            element:<EditTask />,
                            errorElement:<RootBoundary />,

                        }
                    ]
                },           
            ]
        },
        {path:"*", element: <Navigate to="/app/dashboard" replace />}
    ]
}