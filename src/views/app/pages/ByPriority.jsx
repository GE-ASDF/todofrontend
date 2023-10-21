import { useState } from "react";
import Task from "../../../Components/UI/Task";
import { useTheme } from "../../../Contexts/ContextsLoaders/useTheme";
import { useTasks } from "../../../Contexts/TasksContext"
import hookDoneTask from "../../../hooks/hookDoneTask";
import hookShowDetails from "../../../hooks/hookShowDetails";


export default function ByPriority(){
    const {done} = hookDoneTask();
    const [showOnly, setShowOnly] = useState([0,1,2]);
    const themeCtx = useTheme();
    const [showInfoTask, setShowInfoTask] = useState([0,1,2]);
    const {tasks} = useTasks();
    const {detailsShow, showDetails} = hookShowDetails();
    const baixa = tasks.filter((task)=>{
        if(task.priority == 0){
            return task;
        }
    })
    const media = tasks.filter((task)=>{
        if(task.priority == 1){
            return task;
        }
    })
    const alta = tasks.filter((task)=>{
        if(task.priority == 2){
            return task;
        }
    })
    const openInformation = (id)=>{
        if(showInfoTask.includes(id)){
            setShowInfoTask(()=> showInfoTask.filter((info) => info != id))
        }else{
            setShowInfoTask([...showInfoTask, id])
        }
    }
    const handleSetShowOnly = (id)=>{
        if(showOnly.includes(id)){
            setShowOnly(()=> showOnly.filter((info) => info == id))
        }else{
            setShowOnly([id])
        }
    }

    return(
        <div style={{maxHeight:"100vh", height:"calc(100vh - 60px)", overflowY:"auto", overflowX:"hidden"}} className="">
            <div className="flex justify-center mb-4 gap-2">
                <span onClick={()=> setShowOnly([0,1,2])} className="btn btn-light">Todos</span>
                <span onClick={()=> handleSetShowOnly(0)} className="btn bg-blue-700 text-white">Baixa</span>
                <span onClick={()=> handleSetShowOnly(1)} className="btn bg-yellow-700 text-white">Média</span>
                <span onClick={()=> handleSetShowOnly(2)} className="btn text-white bg-red-600">Alta</span>
            </div>
  
            
            <div style={{overflow:"hidden"}} className="row gap-2 justify-center">
                {showOnly.includes(0) &&
                <div className="col-lg-3 bg-blue-700 rounded-lg p-4 col-sm-6">
                    <div onClick={()=> openInformation(0)} className={`${themeCtx.theme == 'dark' ? "bg-blue-700":"bg-blue-700 text-white"} p-2 cursor-pointer rounded text-center fw-bold`}>Baixa</div>
                    {showInfoTask.includes(0) &&
                        baixa.map((task)=>{
                            return (
                                <Task  key={task.id + task.title} done={done} onClick={showDetails} className={`${themeCtx.theme == 'dark' ? 'dark':'bg-light'} `} detailsShow={detailsShow}  task={task} />
                                )
                            })
                        }
                </div>
                }
                {showOnly.includes(1) &&
                <div className="col-lg-3 overflow-y-auto  bg-yellow-700 p-4 col-sm-6 rounded-lg">
                    <div onClick={()=> openInformation(1)} className={`${themeCtx.theme == 'dark' ? "bg-yellow-700 text-white":"bg-yellow-700 text-white"} p-2 cursor-pointer rounded text-center fw-bold`}>Média</div>
                    {showInfoTask.includes(1) && media.map((task)=>{
                        return (
                            <Task  key={task.id + task.title} done={done} onClick={showDetails} className={`${themeCtx.theme == 'dark' ? 'dark':'bg-light'} `} detailsShow={detailsShow}  task={task} />
                        )
                    })}
                </div>
                }
                {showOnly.includes(2) &&
                <div className="col-lg-3 overflow-x-auto p-4 col-sm-6 bg-red-600">
                    <div onClick={()=> openInformation(2)} className={`${themeCtx.theme == 'dark' ? "bg-red-600":"bg-red-600 text-white"} p-2 cursor-pointer rounded text-center fw-bold`}>Alta</div>
                    {showInfoTask.includes(2) && alta.map((task)=>{
                        return (
                            <Task key={task.id + task.title} done={done} onClick={showDetails} className={`${themeCtx.theme == 'dark' ? 'dark':'bg-light'} `} detailsShow={detailsShow}  task={task} />
                        )
                    })}
                </div>
                }
            </div>
           

        </div>
    )
}