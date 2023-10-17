import { useState } from "react";
import { useAlert } from "../Contexts/AlertContext";
import { useTasks } from "../Contexts/TasksContext";
import HTTP from "../api/http";
import hookDoneTask from "./hookDoneTask";

export default function hookRemoveTask(){
    const data = useTasks();
    const {handleSetAlert} = useAlert();
    const {setLoading} = hookDoneTask();
    const removeTask = async (id)=>{
            setLoading(true);
            const http = new HTTP("/admin/tasks/delete/"+id);
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
    return {removeTask, setLoading}
}