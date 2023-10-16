import { useState } from "react";
import { useAlert } from "../Contexts/AlertContext";
import { useTasks } from "../Contexts/TasksContext";
import HTTP from "../api/http";

export default function hookDoneTask(){
    const data = useTasks();
    const {handleSetAlert} = useAlert();
    const [loading, setLoading] = useState(false);
    const done = async (id)=>{
        setLoading(true);
        const http = new HTTP("/admin/tasks/done/"+id);
        const response = await http.http();
        if(response.error){
            handleSetAlert({type:"danger", message:response.message})
            setLoading(false);
        }else{
            handleSetAlert({type:"success", message:response.message})
            data.setTask(true);
            setLoading(false);
        }
    }
    return {done, loading}
}