import Cookies from "js-cookies";
import {Navigate, redirect, useLocation, useNavigate} from "react-router-dom"
import HTTP from "../api/http";
import { useEffect } from "react";
import Home from "./app/Home";
import { useLogged } from "../Contexts/LoggedContext";
import { useUser } from "../utils/queries";
import Loader from "../Components/UI/Loader";


const Template = ()=>{
    const token = Cookies.getItem("token");
    const navigate = useNavigate();
    const {setUserLogged} = useLogged();
    const query = useUser();

    const local = useLocation().pathname.split("/app").filter(el => {
        if(el && el != "/"){
            return el
        }
    });

    const handleLogged = async()=>{
        if(!query.isLoading && !query.isError){
            if(query.data.error == true){
                setUserLogged('null');
                Cookies.removeItem("token");
                return navigate("/")
            }
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

    return (
        <>
        {query.isLoading && <Loader />}
        {query.isError && <p>Ocorreu um erro ao buscar os dados do usuário.</p>}
        {!query.isLoading && !query.isError && 
            <Home />
        }
        </>
    )
       
}

export default Template;