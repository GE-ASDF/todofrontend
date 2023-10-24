import { useStore } from "@tanstack/react-store";
import { Store } from "@tanstack/store";
import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";

export const UserContext = createContext();
export const store = new Store({})

export const UserProvider = ({children})=>{
    const setStore = (user)=>{
        store.setState(user)
    }
    const user = useStore(store)
    return (
        <UserContext.Provider value={{user, setStore}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = ()=> useContext(UserContext);