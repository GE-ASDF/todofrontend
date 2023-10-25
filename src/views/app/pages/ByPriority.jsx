import { useState } from "react";
import { Outlet } from "react-router-dom";
import HTTP from "../../../api/http";
import Task from "../../../Components/UI/Task";
import { useAlert } from "../../../Contexts/AlertContext";
import { useTheme } from "../../../Contexts/ContextsLoaders/useTheme";
import { useTasks } from "../../../Contexts/TasksContext"
import hookDoneTask from "../../../hooks/hookDoneTask";
import hookShowDetails from "../../../hooks/hookShowDetails";


export default function ByPriority(){
    const {done} = hookDoneTask();
    const {handleSetAlert} =  useAlert();

    const [taskDragged, setTaskDragged] = useState('');
    const {setTask, tasks} = useTasks();
    const [showOnly, setShowOnly] = useState([0,1,2]);
    const themeCtx = useTheme();
    const [showInfoTask, setShowInfoTask] = useState([0,1,2]);
    const {detailsShow, showDetails} = hookShowDetails();
    const baixa = !tasks.isLoading ? tasks.data.filter((task)=>{
        if(task.priority == 0 && task.done == 0){
            return task;
        }
    }):[]
    const media = !tasks.isLoading ? tasks.data.filter((task)=>{
        if(task.priority == 1 && task.done == 0){
            return task;
        }
    }):[]
    const alta = !tasks.isLoading ? tasks.data.filter((task)=>{
        if(task.priority == 2 && task.done == 0){
            return task;
        }
    }):[]
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
    const onDrag = (e, task)=>{
        e.preventDefault();
        setTaskDragged({dragged: task})
    }
    const onDrop = async (e, priority)=>{
        const http = new HTTP('/admin/tasks/changepriority/'+taskDragged.dragged+'/'+priority)
        const changePriority = await http.http();
        if(changePriority.error == false){
            handleSetAlert({type:"success", message:changePriority.message})
            setTask(true)
        }else{
            handleSetAlert({type:"danger", message:changePriority.message})
        }
    }
    const onDragOver = (e)=>{
        e.preventDefault();
    }
    const onDropTask = (e, prev)=>{
        
    }
    return(
        <div style={{maxHeight:"100vh", height:"calc(100vh - 60px)", overflowY:"auto", overflowX:"hidden"}} className="p-4">
        <h1 className="sm:text-2xl md:text-5xl fw-bold mb-4">Pendentes ({baixa.length + media.length + alta.length})</h1>

            <div className="flex justify-center mb-4 gap-2">
                <span onClick={()=> setShowOnly([0,1,2])} className="btn btn-light">Todos</span>
                <span onClick={()=> handleSetShowOnly(0)} className="btn bg-blue-700 text-white">Baixa</span>
                <span onClick={()=> handleSetShowOnly(1)} className="btn bg-yellow-700 text-white">Média</span>
                <span onClick={()=> handleSetShowOnly(2)} className="btn text-white bg-red-600">Alta</span>
            </div>            
            <div style={{overflow:"hidden"}} className="row gap-2 justify-center">
                {showOnly.includes(0) &&
                <div onDrop={(e)=> onDrop(e, 0)} onDragOver={(e) => onDragOver(e) } className="col-lg-3 bg-blue-700 rounded-lg p-4 col-sm-6">
                    <div onClick={()=> openInformation(0)} className={`${themeCtx.theme == 'dark' ? "bg-blue-700":"bg-blue-700 text-white"} p-2 cursor-pointer rounded text-center fw-bold`}>Baixa ({baixa.length})</div>
                    {showInfoTask.includes(0) &&
                        baixa.map((task)=>{
                            return (
                                <Task onDragOver={(e)=> onDragOver(e)}  onDrag={(e)=> onDrag(e, task.id)} key={task.id + task.title} done={done} onClick={showDetails} className={`cursor-move ${themeCtx.theme == 'dark' ? 'dark':'bg-light'} `} detailsShow={detailsShow}  task={task} />
                                )
                            })
                        }
                </div>
                }
                {showOnly.includes(1) &&
                <div onDrop={(e)=> onDrop(e, 1)} onDragOver={(e) => onDragOver(e) } className="col-lg-3 overflow-y-auto  bg-yellow-700 p-4 col-sm-6 rounded-lg">
                    <div onClick={()=> openInformation(1)} className={`${themeCtx.theme == 'dark' ? "bg-yellow-700 text-white":"bg-yellow-700 text-white"} p-2 cursor-pointer rounded text-center fw-bold`}>Média ({media.length})</div>
                    {showInfoTask.includes(1) && media.map((task)=>{
                        return (
                            <Task onDragOver={(e)=> onDragOver(e)} onDropTask={(e) => onDropTask(e, task.id)} onDrag={(e)=> onDrag(e, task.id)} key={task.id + task.title} done={done} onClick={showDetails} className={`cursor-move ${themeCtx.theme == 'dark' ? 'dark':'bg-light'} `} detailsShow={detailsShow}  task={task} />
                        )
                    })}
                </div>
                }
                {showOnly.includes(2) &&
                <div onDrop={(e)=> onDrop(e, 2)} onDragOver={(e) => onDragOver(e) } className="col-lg-3 overflow-x-auto p-4 col-sm-6 bg-red-600 rounded-lg">
                    <div onClick={()=> openInformation(2)} className={`${themeCtx.theme == 'dark' ? "bg-red-600":"bg-red-600 text-white"} p-2 cursor-pointer rounded text-center fw-bold`}>Alta ({alta.length})</div>
                    {showInfoTask.includes(2) && alta.map((task)=>{
                        return (
                            <Task onDragOver={(e)=> onDragOver(e)} onDropTask={(e) => onDropTask(e, task.id)} onDrag={(e)=> onDrag(e, task.id)} key={task.id + task.title} done={done} onClick={showDetails} className={`cursor-move ${themeCtx.theme == 'dark' ? 'dark':'bg-light'} `} detailsShow={detailsShow}  task={task} />
                        )
                    })}
                </div>
                }
            </div>
           <Outlet />

        </div>
    )
}