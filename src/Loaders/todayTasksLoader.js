import HTTP from "../api/http"
import {getDate} from "../utils/utils";



export const todayTasksLoader = async ()=>{
    const http = new HTTP("/admin/tasks/today/" + getDate());
    const response = await http.http();
    return response;
}