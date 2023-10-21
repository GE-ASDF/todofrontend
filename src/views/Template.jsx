import Cookies from "js-cookies";
import {Navigate, redirect, useLocation, useNavigate} from "react-router-dom"
import HTTP from "../api/http";
import { useEffect } from "react";
import Home from "./app/Home";
import { useLogged } from "../Contexts/LoggedContext";


const Template = ()=>{
    const token = Cookies.getItem("token");
    const navigate = useNavigate();
    const {setUserLogged} = useLogged();
    const local = useLocation().pathname.split("/app").filter(el => {
        if(el && el != "/"){
            return el
        }
    });

    const handleLogged = async()=>{
        const http = new HTTP('/auth');
        const response = await http.http();
       
        if(response.error == true){
            setUserLogged('null');
            Cookies.removeItem("token");
            return navigate("/")
        }
    }

    useEffect(()=>{
        handleLogged()
    })
 
    if(!token){
        return <Navigate to="/" />;
    }
    if(local.length <= 0){
        return <Navigate to="/app/dashboard" />
    }
    return <Home />
       
}

export default Template;