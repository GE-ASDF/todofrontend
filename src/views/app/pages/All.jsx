import { useEffect, useState } from "react"
import { useLoaderData } from "react-router-dom"
import Tasks from "../../../Components/Views/Home/Tasks";
import { useTasks } from "../../../Contexts/TasksContext";
import { convertDate, dateISOString, getDate } from "../../../utils/utils";

export default function All(){
    const data = useTasks();
    const [tasks, setTasks] = useState([]);
    
    const [detailsShow, setDetails] = useState({
        show:false,
        id:'',
    });
    const done = (id)=>{
        const newTasks = tasks.map((task)=>{
            if(task.id == id){
                if(task.done == 0){
                    task.done = 1;
                }else{
                    task.done = 0;
                }
            }
            return task;
        })
        
        setTasks(newTasks)
    }
    useEffect(()=>{
        return ()=> setTasks(data.tasks)
    },[data])
    const showDetails = (id)=>{
        setDetails({show: !detailsShow.show, id})
    }
    return (
        <div className="flex flex-wrap flex-col p-4">
        <h1 className="sm:text-2xl md:text-5xl fw-bold">Todas as tasks</h1>
            <Tasks tasks={tasks} done={done} detailsShow={detailsShow} onClick={showDetails} />
        </div>
    )
}