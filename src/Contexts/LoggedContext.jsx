import { createContext, useContext, useEffect, useState } from "react";

export const LoggedContext = createContext();
const LOGGED_KEY = 'logged';
export const LoggedProvider = (props)=>{
    const [userLogged, setUserLogged] = useState(localStorage.getItem(LOGGED_KEY)); 

    
    useEffect(()=>{
        localStorage.setItem(LOGGED_KEY, userLogged);
    },[userLogged])

    return (
        <LoggedContext.Provider value={{user: userLogged, setUserLogged}}>
            {props.children}
        </LoggedContext.Provider>
    )
}
export const useLogged = ()=> useContext(LoggedContext);