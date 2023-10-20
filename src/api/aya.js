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
    #configFetch;
    
    async #fetchData(){
        try{
            const response = await fetch(this.endpoint,this.#configFetch);
            const data = await response.json();
            return await data;
        }catch(err){
            return {
                error:true,
                message:"Não foi possível realizar a consulta com fetch",
                errorMessage: err,
            };
        }
    }
    async post(){
        this.data = data;
        return this;
    }

    #createConfig(customHeaders, body = ''){
        this.headers = {...this.#defaultHeaders, ...customHeaders}
        this.#configFetch = {credentials:'include',mode:"cors", method:this.method, headers:this.headers}
        if(Object.keys(body).length > 0) this.configFetch.body = JSON.stringify(body);
    }

    async get(endpoint = '', customHeaders = {}){
        this.endpoint = `${this.#backendURL}${endpoint}`;
        this.#createConfig(customHeaders);
        const data = await this.#fetchData();
        this.method = 'GET';        
        this.data = {...this.data, data};
        return this;
    }
}

export default new aya