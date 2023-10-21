import PrivateRoutes from "./Routes/PrivateRoutes"
import {RouterProvider, createBrowserRouter,  useNavigate, Navigate} from "react-router-dom";
import PublicRoutes from "./Routes/PublicRoutes";
import { AlertProvider } from "./Contexts/AlertContext";
import { useLogged } from "./Contexts/LoggedContext";
import {ThemeProvider} from "./Contexts/ThemeContext";

function App() {

  let routes = createBrowserRouter([...PublicRoutes(), ...PrivateRoutes()]);

  return (
        <ThemeProvider>
          <AlertProvider>
       
              <RouterProvider router={routes}></RouterProvider>
          
          </AlertProvider>
        </ThemeProvider>
  )
}

export default App
