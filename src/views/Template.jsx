import {Navigate, useLocation} from "react-router-dom"
import Home from "./app/Home";
import { useUser } from "../utils/queries";
import { useLogged } from "../Contexts/LoggedContext";
import { useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookies";

const Template = ()=>{
     const query = useUser();
   const {user, setUserLogged} = useLogged();

    const local = useLocation().pathname.split("/app").filter(el => {
        if(el && el != "/"){
            return el
        }
    });

    if(local.length <= 0){
        return <Navigate to="/app/dashboard" />
    }

    if(!query.isLoading){
        if(!query.data.error){
            setUserLogged(JSON.stringify(query.data.user))
        }
    }

    return (
        <>
            {!query.isLoading && !query.data.error &&
                <Home  />
            }
            {
                !query.isLoading && !query.isRefetching && !query.isFetching && query.data.error &&
                <Navigate to="/" />
            }
        </>
    )
}

export default Template;