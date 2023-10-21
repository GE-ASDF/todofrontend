import config from "../../config/config";
import Cookies from "js-cookies";

class HTTP{
    #backendURL = config.backendURL;
    #TOKEN = Cookies.getItem("token")
    #defaultHeaders = {
        Accept:"application/json",
        Authorization:this.#TOKEN,
        "Content-Type":"application/json",
    }
    constructor(endpoint = '', method = 'GET', body = {}, customHeaders = {}){
        this.endpoint = `${this.#backendURL}${endpoint}`;
        this.method = method;
        this.headers = {...this.#defaultHeaders, ...customHeaders}
        this.configFetch = {credentials:'include',mode:"cors", method:this.method, headers:this.headers}

        if(Object.keys(body).length > 0) this.configFetch.body = JSON.stringify(body); 
    }
    
    async getToken(){
        try{
            const CSRF_TOKEN_AWAIT = await fetch(`${this.#backendURL}/csrfToken`, {headers:this.#defaultHeaders})
            const TOKEN = await CSRF_TOKEN_AWAIT.json();
            return TOKEN.csrfToken;
        }catch(error){
            return {
                error:true,
                message:"Não foi possível retornar o token.",
                errorMessage: error,
            };
        }
    }

    async http(){
        try{
            const response = await fetch(this.endpoint, this.configFetch);
            const data = await response.json();
            return await data;
        }catch(error){
            return {
                error:true,
                message:"Não foi possível realizar a consulta com fetch",
                errorMessage: error,
            };
        }
    }    
} 

export default HTTP;
