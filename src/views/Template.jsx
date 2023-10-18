import Cookies from "js-cookies";
import {Navigate, useNavigate} from "react-router-dom"
import HTTP from "../api/http";
import { useEffect, useState } from "react";
import Home from "./app/Home";
import { useLogged } from "../Contexts/LoggedContext";

const Template = ()=>{
    const token = Cookies.getItem("token");
    const navigate = useNavigate();
    const http = new HTTP('/auth');
    const {setUserLogged} = useLogged();

    const handleLogged = async()=>{
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

    return  <Home />
}

export default Template;