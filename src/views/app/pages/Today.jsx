import { useEffect, useState } from "react"
import { useLoaderData } from "react-router-dom"
import { useTasks } from "../../../Contexts/TasksContext";
import { convertDate, dateISOString, getDate } from "../../../utils/utils";

export default function Today(){
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
        const taskss = data.tasks.length > 0 ? data.tasks.filter((task)=>{
            if(convertDate( new Date(task.enddate).toLocaleDateString('pt-br')) == '2023-10-14'){
                return task;
            }
        }):[];
        return ()=> setTasks(taskss)
    },[data])
    
    const showDetails = (id)=>{
        setDetails({show: !detailsShow.show, id})
    }
    return (
        <div className="flex  flex-col p-4">
        <h1 className="text-5xl fw-bold">Tasks de hoje</h1>
            {tasks.map(task =>{
                return (
                    <div key={task.id}  className="flex cursor-pointer flex-row border p-2 mt-4">
                    <div onClick={() => showDetails(task.id)} className="flex w-100 flex-col">
                        <h5 className="fw-bold text-sm">{task.title} - {new Date(task.enddate).toLocaleDateString('pt-br')}</h5>
                        {detailsShow.show && detailsShow.id == task.id && 
                            <>
                                <span className="mx-2">Descrição: {task.description}</span>
                            </>
                        }
                    </div>
                    <div className="flex flex-row justify-start items-start gap-2">
                        {task.done == 0 && <span className="btn btn-sm btn-warning" onClick={()=> done(task.id)}>{task.done == 0 && 'Pending'}</span>}
                        {task.done > 0 && <span className="btn btn-sm btn-success" onClick={()=> done(task.id)}>{task.done > 0 && 'Done'}</span>}
                        <span className="btn btn-sm btn-danger" onClick={()=> done(task.id)}>Remover</span>
                    </div>
                    </div>
                )
            })}
        </div>
    )
}