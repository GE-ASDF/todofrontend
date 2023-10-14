import { createContext, useContext, useEffect, useState } from "react";
import {todayTasksLoader} from "../Loaders/todayTasksLoader";
import HTTP from "../api/http";
import { useLogged } from "./LoggedContext";

export const StickyContext = createContext();




export const StickyProvider = ({children})=>{
    const [sticky, setSticky] = useState(true);
    const [stickies, setStickies] = useState([])
    const data = useLogged();
    const user = JSON.parse(data.user);

    const getSticky = async ()=>{
        const http = new HTTP('/admin/sticky/all/'+user.id)
        const response = await http.http()
        setStickies(response);
    }

    useEffect(()=>{
        getSticky();
        setSticky(false);
    },[sticky])
   
    return (
        <StickyContext.Provider value={{task: sticky,stickies, setSticky, setStickies}}>
            {children}
        </StickyContext.Provider>
    )
}

export const useSticky = ()=> useContext(StickyContext);