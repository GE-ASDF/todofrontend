import { TasksProvider } from "./Contexts/TasksContext";
import PrivateRoutes from "./Routes/PrivateRoutes"
import {RouterProvider, createBrowserRouter} from "react-router-dom";
import PublicRoutes from "./Routes/PublicRoutes";
import { AlertProvider } from "./Contexts/AlertContext";
import { LoggedProvider } from "./Contexts/LoggedContext";
import {ThemeProvider} from "./Contexts/ThemeContext";
import { useState } from "react";
import HTTP from "./api/http";
import { useEffect } from "react";


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
