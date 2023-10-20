import { useState } from "react";
import { normalizeString } from "../../../../utils/utils";
import Task from "../../../UI/Task";
import Pagination from "../../../UI/Pagination";
import hookRemoveTask from "../../../../hooks/hookRemoveTask";
import Loader from "../../../UI/Loader";
import hookDoneTask from "../../../../hooks/hookDoneTask";
import Alert from "../../../UI/Alert";

export default function Tasks({tasks,search = '',showDone, filter, detailsShow, onClick}){
    const {done, loading} = hookDoneTask();
    const priorities = ['Baixa', 'Média', 'Alta'];
    const [page, setPage] = useState(1);
    const itemsPerPage = 10;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const maxPagesItems = tasks.length > 0 && !filter || !priorities[filter] ? tasks.filter((task)=>{
        if(showDone){
            if(search != '' && (normalizeString(task.title).includes(normalizeString(search) || normalizeString(task.description).includes(normalizeString(search))))){
                return task;
            }else if(!search){
                return task;
            }
        }else{
            if(task.done == 0){
                if(search != '' && (normalizeString(task.title).includes(normalizeString(search) || normalizeString(task.description).includes(normalizeString(search))))){
                    return task;
                }else if(!search){
                    return task;
                }
            }
        }
    }):tasks.length > 0 ? tasks.filter((task)=>{
        if(showDone){
            if(search != '' && (normalizeString(task.title).includes(normalizeString(search) || normalizeString(task.description).includes(normalizeString(search))))){
                if(filter && priorities[filter] && task.priority == filter){
                    return task;
                }
            }else if(!search){
                if(filter && priorities[filter] && task.priority == filter){
                    return task;
                }
            }
        }else{
            if(task.done == 0){
                if(search != '' && (normalizeString(task.title).includes(normalizeString(search) || normalizeString(task.description).includes(normalizeString(search))))){
                    if(filter && priorities[filter] && task.priority == filter){
                        return task;
                    }
                }else if(!search){
                    if(filter && priorities[filter] && task.priority == filter){
                        return task;
                    }
                }
            }
        }
    }):[];
    const maxPages = Math.ceil(maxPagesItems.length / itemsPerPage);
    const newTasks = tasks.length > 0 && !filter || !priorities[filter] ? tasks.filter((task)=>{
        if(showDone){
            if(search != '' && (normalizeString(task.title).includes(normalizeString(search) || normalizeString(task.description).includes(normalizeString(search))))){
                return task;
            }else if(!search){
                return task
            }
        }else{
            if(task.done == 0){
                if(search != '' && (normalizeString(task.title).includes(normalizeString(search) || normalizeString(task.description).includes(normalizeString(search))))){
                    return task;
                }else if(!search){
                    return task
                }
            }
        }
    }).slice(startIndex, endIndex): tasks.length > 0 ? tasks.filter((task)=>{
        if(showDone){

            if(search != '' && (normalizeString(task.title).includes(normalizeString(search) || normalizeString(task.description).includes(normalizeString(search))))){
                if(filter && priorities[filter] && task.priority == filter){
                    return task;
                }
            }else if(!search){
                if(filter && priorities[filter] && task.priority == filter){
                    return task;
                }
            }
        }else{
            if(task.done == 0){
                if(search != '' && (normalizeString(task.title).includes(normalizeString(search) || normalizeString(task.description).includes(normalizeString(search))))){
                    if(filter && priorities[filter] && task.priority == filter){
                        return task;
                    }
                }else if(!search){
                    if(filter && priorities[filter] && task.priority == filter){
                        return task;
                    }
                }
            }
        }
    }).slice(startIndex, endIndex):[];

    return (
        <>
            {loading && <Loader />}
            <Pagination maxPages={maxPages} setPage={setPage} page={page} itemsPerPage={itemsPerPage} />
            <div className="row gap-2">

            {newTasks.length > 0 && newTasks.map(task =>{
                return (
                    <Task className="col-lg-3 col-sm-3" onClick={onClick} detailsShow={detailsShow} task={task} done={done} key={task.id} />
                    )
                })}
            </div>
            
            <Pagination maxPages={maxPages} setPage={setPage} page={page} itemsPerPage={itemsPerPage} />
        </>
    )
}