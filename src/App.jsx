import { TasksProvider } from "./Contexts/TasksContext";
import PrivateRoutes from "./Routes/PrivateRoutes"
import {RouterProvider, createBrowserRouter} from "react-router-dom";
import PublicRoutes from "./Routes/PublicRoutes";
import { AlertProvider } from "./Contexts/AlertContext";
import { LoggedProvider } from "./Contexts/LoggedContext";

function App() {

  const routes = createBrowserRouter([...PublicRoutes(),...PrivateRoutes()])
  return (
        <LoggedProvider>
          <AlertProvider>
            <RouterProvider router={routes}></RouterProvider>
          </AlertProvider>
        </LoggedProvider>
  )
}

export default App
