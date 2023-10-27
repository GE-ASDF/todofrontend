import { Navigate } from "react-router-dom";
import { useUserLoggedMutation } from "../utils/mutations";
import { useEffect, useRef } from "react";
import { useLogged } from "../Contexts/LoggedContext";

export default function RequireAuth({children}){
    const useUserLogged = useUserLoggedMutation();
    const {user, setUserLogged} = useLogged();
    const isAuth = useRef(false);
    
    const handleLogged = ()=>{
        useUserLogged.mutate('', {
            onSuccess:(res)=>{
                if(res.error){
                    setUserLogged(JSON.stringify(null))
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