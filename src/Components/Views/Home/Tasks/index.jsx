import { useState } from "react";
import { normalizeString } from "../../../../utils/utils";
import Task from "../../../UI/Task";
import Pagination from "../../../UI/Pagination";

export default function Tasks({tasks,search = '',showDone, done, filter, detailsShow, onClick}){
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
    }):tasks.filter((task)=>{
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
    });
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
    }).slice(startIndex, endIndex):tasks.filter((task)=>{
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
    }).slice(startIndex, endIndex);
  
    return (
        <>
            <Pagination maxPages={maxPages} setPage={setPage} page={page} itemsPerPage={itemsPerPage} />
            {newTasks.length > 0 && newTasks.map(task =>{
                return (
                    <Task onClick={onClick} detailsShow={detailsShow} task={task} done={done} key={task.id} />
                    )
            })}
            <Pagination maxPages={maxPages} setPage={setPage} page={page} itemsPerPage={itemsPerPage} />
        </>
    )
}