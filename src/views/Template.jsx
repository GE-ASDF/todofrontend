import Cookies from "js-cookies";
import {useNavigate, Navigate} from "react-router-dom"
import HTTP from "../api/http";
import { useEffect, useState } from "react";

const Template = ()=>{
    const token = Cookies.getItem("token");
    const http = new HTTP('/token');
    
    if(!token){
        return <Navigate to="/" />;
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
    
    return  <>Template</>
}

export default Template;