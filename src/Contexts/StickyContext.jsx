import { createContext, useContext, useEffect, useState } from "react";
import HTTP from "../api/http";
import { useLogged } from "./LoggedContext";
import { useStickies } from "../utils/queries";
export const StickyContext = createContext();




export const StickyProvider = ({children})=>{
    const [sticky, setSticky] = useState(false);
    const stickies = useStickies()

    useEffect(()=>{
        stickies.refetch();
        setSticky(false);
    },[sticky])
   
    return (
        <StickyContext.Provider value={{sticky: sticky,stickies, setSticky}}>
            {children}
        </StickyContext.Provider>
    )
}

export const useSticky = ()=> useContext(StickyContext);