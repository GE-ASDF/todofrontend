import Cookies from "js-cookies";
import {Navigate, redirect, useLocation, useNavigate} from "react-router-dom"
import HTTP from "../api/http";
import { useEffect } from "react";
import Home from "./app/Home";
import { useLogged } from "../Contexts/LoggedContext";
import { useUser } from "../utils/queries";
import Loader from "../Components/UI/Loader";


const Template = ()=>{
    const local = useLocation().pathname.split("/app").filter(el => {
        if(el && el != "/"){
            return el
        }
    });
    if(local.length <= 0){
        return <Navigate to="/app/dashboard" />
    }
    return (
        <Home />
    )
}

export default Template;