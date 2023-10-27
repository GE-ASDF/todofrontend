import { Navigate } from "react-router-dom";
import { useUserLoggedMutation } from "../utils/mutations";
import { useEffect } from "react";
import { useLogged } from "../Contexts/LoggedContext";
import { removeCookies } from "../utils/utils";
import Cookies from "js-cookies";

export default function RequireAuth({children}){
    const useUserLogged = useUserLoggedMutation();
    const {user, setUserLogged} = useLogged();

    const handleLogged = ()=>{
        useUserLogged.mutate('', {
            onSuccess:(res)=>{
                if(res.error){
                    setUserLogged(JSON.stringify('null'))
                }else{
                    setUserLogged(JSON.stringify(res.user))
                }
            }
        })
    }
    useEffect(()=>{
        handleLogged();
    },[user])

    return (
        <>
            {useUserLogged.status != 'pending' && user != 'null' && user &&
                children
            }
            {useUserLogged.status != 'pending' && user == 'null' &&
                <Navigate to="/" />
            }
        </>
    )

}