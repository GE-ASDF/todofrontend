import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { createContext } from "react";

export const ThemeContext = createContext(null);

export const ThemeProvider = ({children})=>{
    const [theme, setTheme] = useState(localStorage.getItem("theme"))
    
    useEffect(()=>{
        localStorage.setItem("theme", theme);
    },[theme])

    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = ()=> useContext(ThemeContext);