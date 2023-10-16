import { createContext, useContext, useEffect, useState } from "react";
import {todayTasksLoader} from "../Loaders/todayTasksLoader";
import HTTP from "../api/http";
import { useLogged } from "./LoggedContext";

export const TasksContext = createContext();
const TASKS_ID = 'tasks'



export const TasksProvider = ({children})=>{
    const [task, setTask] = useState(true);
    const [tasks, setTasks] = useState([])
    const data = useLogged();
    const user = JSON.parse(data.user);

    const getTasks = async ()=>{
        const http = new HTTP('/admin/tasks/all/'+user.id)
        const response = await http.http()
        if(response.error){
            setTasks([]);
        }else{
            setTasks(response);
        }
    }

    useEffect(()=>{
        getTasks();
        setTask(false);
    },[task])
   
    return (
        <TasksContext.Provider value={{task: task,tasks, setTask}}>
            {children}
        </TasksContext.Provider>
    )
}

export const useTasks = ()=> useContext(TasksContext);