import config from "../../config/config";
import Cookies from "js-cookies";

class aya{
    #backendURL = config.backendURL;
    #TOKEN = Cookies.getItem("token")
    #defaultHeaders = {
        Accept:"application/json",
        Authorization:this.#TOKEN,
        "Content-Type":"application/json",
    }
    constructor(endpoint = '', customHeaders = {}){
        this.endpoint = `${this.#backendURL}${endpoint}`;
        this.method = method;
        this.headers = {...this.#defaultHeaders, ...customHeaders}
        this.configFetch = {credentials:'include',mode:"cors", method:this.method, headers:this.headers}

        if(Object.keys(body).length > 0) this.configFetch.body = JSON.stringify(body); 
    }
    async #fetchData(){
        try{
            const response = await fetch(this.endpoint,this.configFetch);
            const data = await response.json();
            this.data = await data;
            return this; 
        }catch(err){
            return {
                error:true,
                message:"Não foi possível realizar a consulta com fetch",
                errorMessage: error,
            };
        }
    }
    async post(){

        this.data = data;
        return this;
    }
    async get(endpoint = '', customHeaders = {}){

        const data = await this.#fetchData();
        console.log("OLá")
        this.data = data;
        return this;
    }
}
