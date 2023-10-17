import config from "../../config/config";
import Cookies from "js-cookies";
const TOKEN = Cookies.getItem("token")
class HTTP{
    #backendURL = config.backendURL;
    #defaultHeaders = {
        Authorization:TOKEN,
        "Content-Type":"application/json",
    }
    constructor(endpoint = '', method = 'GET', body = {}, customHeaders = {}){
        this.endpoint = `${this.#backendURL}${endpoint}`;
        this.method = method;
        this.headers = {...this.#defaultHeaders, ...customHeaders}
        this.configFetch = {method:this.method, headers:this.headers}
        if(Object.keys(body).length > 0) this.configFetch.body = JSON.stringify(body); 
        
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
