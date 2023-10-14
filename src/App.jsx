import { TasksProvider } from "./Contexts/TasksContext";
import PrivateRoutes from "./Routes/PrivateRoutes"
import {RouterProvider, createBrowserRouter} from "react-router-dom";
import PublicRoutes from "./Routes/PublicRoutes";
import { AlertProvider } from "./Contexts/AlertContext";
import { LoggedProvider } from "./Contexts/LoggedContext";
import {ThemeProvider} from "./Contexts/ThemeContext";


function App() {

  const routes = createBrowserRouter([...PublicRoutes(),...PrivateRoutes()])
 
  return (
        <LoggedProvider>
          <ThemeProvider>
            <AlertProvider>
              <RouterProvider router={routes}></RouterProvider>
            </AlertProvider>
          </ThemeProvider>
          </LoggedProvider>
  )
}

export default App
