import Cookies from "js-cookies";
import {Navigate, useNavigate} from "react-router-dom"
import HTTP from "../api/http";
import { useEffect, useState } from "react";
import Home from "./app/Home";
import { useLogged } from "../Contexts/LoggedContext";
import Loader from "../Components/UI/Loader";

const Template = ()=>{
    const token = Cookies.getItem("token");
    const navigate = useNavigate();
    const {user, setUserLogged} = useLogged();
    
    const handleLogged = async()=>{
        const http = new HTTP('/auth');
        const response = await http.http();
        console.log(response)
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

    return <Home />
       
    
}

export default Template;