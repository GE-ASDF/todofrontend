import { createContext, useContext, useEffect, useState } from "react";
import {todayTasksLoader} from "../Loaders/todayTasksLoader";
import HTTP from "../api/http";
import { useLogged } from "./LoggedContext";
import { useTasks as queryTasks } from "../utils/queries";
export const TasksContext = createContext();
const TASKS_ID = 'tasks'


export const TasksProvider = ({children})=>{
    const [task, setTask] = useState(true);
    const {user} = useLogged();
    const dataUser = JSON.parse(user)
    const query = queryTasks(dataUser.id)
    useEffect(()=>{
        query.refetch();
        setTask(false);
    },[task])
   
    return (
        <TasksContext.Provider value={{task: task,tasks:query, setTask}}>
            {children}
        </TasksContext.Provider>
    )
}

export const useTasks = ()=> useContext(TasksContext);