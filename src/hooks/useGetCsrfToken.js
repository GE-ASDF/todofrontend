import { useEffect, useState } from "react";
import HTTP from "../api/http";

const useGetCsrfToken = ()=>{
    const [_csrfToken, setCsrfToken] = useState();
    const getCsrfToken = async()=>{
        const http = new HTTP("/csrfToken");
        const response = await http.http();
        if(!response.error == true){
            setCsrfToken(response.csrfToken)
        }
    }
    useEffect(()=>{
        getCsrfToken();
    },[])
    return {_csrfToken, getCsrfToken};
}

export default useGetCsrfToken;