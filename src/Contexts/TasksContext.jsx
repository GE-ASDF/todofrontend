import { createContext, useContext, useEffect, useState } from "react";
import {todayTasksLoader} from "../Loaders/todayTasksLoader";
import HTTP from "../api/http";

export const TasksContext = createContext();
const TASKS_ID = 'tasks'



export const TasksProvider = ({children})=>{
    const [task, setTask] = useState(true);
    const [tasks, setTasks] = useState([])

    const getTasks = async ()=>{
        const http = new HTTP('/admin/tasks/all')
        const response = await http.http()
        setTasks(response);
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