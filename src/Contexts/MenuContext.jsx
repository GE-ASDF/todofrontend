import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import { useContext } from "react";

export const MenuContext = createContext();

export const MenuProvider = ({children})=>{
    const [showMenu, setShowMenu] = useState(true);

    useEffect(()=>{

    },[showMenu])

    return (
        <MenuContext.Provider value={{showMenu, setShowMenu}}>
            {children}
        </MenuContext.Provider>
    )
}
export const useMenu = () => useContext(MenuContext);