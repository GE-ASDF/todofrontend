import {Navigate, redirect, useLocation} from "react-router-dom"
import { useEffect } from "react";
import Home from "./app/Home";
import { useUser } from "../utils/queries";

const Template = ()=>{
   const query = useUser();

   useEffect(()=>{
    query.refetch();    
   })

    const local = useLocation().pathname.split("/app").filter(el => {
        if(el && el != "/"){
            return el
        }
    });
    if(local.length <= 0){
        return <Navigate to="/app/dashboard" />
    }
    
    return (
        <>
            {!query.isLoading && !query.data.error &&
                <Home />
            }
            {
                !query.isLoading && !query.isRefetching && !query.isFetching && query.data.error &&
                <Navigate to="/" />
            }
        </>
    )
}

export default Template;