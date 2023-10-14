import Cookies from "js-cookies";
import {Navigate} from "react-router-dom"
import HTTP from "../api/http";
import { useEffect } from "react";
import Home from "./app/Home";
import { useLogged } from "../Contexts/LoggedContext";

const Template = ()=>{
    const token = Cookies.getItem("token");
    const http = new HTTP('/token');
    const logged = useLogged();

    if(!logged.user || logged.user == "null"){
        Cookies.removeItem("token");
        return <Navigate to="/" />
    }
    
    useEffect(()=>{
        const handleLogged = async()=>{
            const response = await http.http();
            if(response.error){
                return <Navigate to="/" />
            }
        }
        handleLogged()
    })

    if(!token){
        return <Navigate to="/" />;
    }

    return  <Home />
}

export default Template;