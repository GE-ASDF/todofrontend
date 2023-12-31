import PrivateRoutes from "./Routes/PrivateRoutes"
import {RouterProvider, createBrowserRouter} from "react-router-dom";
import PublicRoutes from "./Routes/PublicRoutes";
import { AlertProvider } from "./Contexts/AlertContext";
import {ThemeProvider} from "./Contexts/ThemeContext";


function App() {
  const routes = createBrowserRouter([...PublicRoutes(),  ...PrivateRoutes()]);

  return (
    <ThemeProvider>
      <AlertProvider>
          <RouterProvider router={routes}></RouterProvider>
        </AlertProvider>
      </ThemeProvider> 
  ) 
}

export default App
