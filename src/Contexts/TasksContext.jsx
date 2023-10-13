import { createContext, useContext, useEffect, useState } from "react";

export const TasksContext = createContext();
const TASKS_ID = 'tasks'


export const TasksProvider = ({children})=>{
    const [tasks, setTasks] = useState(localStorage.getItem(TASKS_ID) ?? '');
    
    useEffect(()=>{
        localStorage.setItem(TASKS_ID, tasks);
    },[tasks])

    return (
        <TasksContext.Provider value={{tasks: tasks ? JSON.parse(tasks):[], id:tasks ? JSON.parse(tasks).length:1, setTasks}}>
            {children}
        </TasksContext.Provider>
    )
}

export const useTasks = ()=> useContext(TasksContext);