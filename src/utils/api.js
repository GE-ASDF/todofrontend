import config from "../../config/config";
import axios from "axios";
import Cookies from "js-cookies"

const TOKEN = Cookies.getItem("token")

const api = axios.create({
    baseURL:config.backendURL,
    headers:{
        Accept:"application/json",
        Authorization:TOKEN,
        "Content-Type":"application/json",
    },
    withCredentials: true
})

/**
 * Pegar todas as tasks de um usuário
 * @param {number} userId 
 * @returns {Promise<Tasks[]>} 
 */
export const getTasks = async(userId)=>{
    try{
        const result = await api.get(`/admin/tasks/all/${userId}`);   
        return result.data;
    }catch(error){
        return {error: true, message:"Erro ao tentar fazer a solicitação."}
    }
}

export const getStickies = async(userId)=>{
    try{
        const result = await api.get(`/admin/sticky/all/${userId}`);   
        return result.data;
    }catch(error){
        return {error: true, message:"Erro ao tentar fazer a solicitação."}
    }
}

/**
 * 
 * @param {Object} data 
 * @returns {Promise<User>}
 */
export const getUser = async()=>{
    try{
        const token = Cookies.getItem("token");
        const result = await api.get("/auth", {headers: {Authorization:token}});
        return result.data;
    }catch(error){
        return {error: true, message:"Erro ao tentar fazer a solicitação."}
    }
}

export const authenticate = async(data)=>{
    try{
        const user = await api.post("/auth", data);
        return user.data;
    }catch(error){
        return {error: true, message:"Erro ao tentar fazer a solicitação."}
    }
}

