import { useEffect, useRef } from "react";
import { Link, useLoaderData, useLocation, useNavigate, useParams } from "react-router-dom";
import "./styles/edittask.css"
import { useForm } from "react-hook-form";
import { z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod"
import { useCategories, useTask } from "../../../utils/queries";
import { useQueryClient } from "@tanstack/react-query";
import { convertDate } from "../../../utils/utils";

const formEditTask = z.object({
    id: z.number(),
    title: z.string().min(2, 'Mínimo 2 caracteres'),
    description: z.string().max(1024, 'Máximo de 1024 caracteres').optional(), 
    enddate: z.date({coerce:true}),
    idcategory: z.number(),
    priority: z.number(),
})
export default function EditTask(){
    const categories =  useCategories();
    const params = useParams();
    const task = useTask(params.id)
    const {register, handleSubmit, reset, getValues, formState:{errors}} = useForm({defaultValues:{}, resolver: zodResolver(formEditTask)});
    const local = useLocation().pathname.split("/edittask/");
    const containerRef = useRef(null);
    const navigate = useNavigate();
    console.log(task, params.id)

    useEffect(()=>{
        task.refetch();
    },[])

    const handleClose = ()=>{
        navigate(local[0])
    }

    useEffect(()=>{
        const handleCloserClick = (e)=>{
            if(!e.target.classList.contains("btn-edit")){
                if(e.target.closest('.container-edittask') == null){
                    navigate(local[0])
                }
            }
        }
        window.addEventListener("click", handleCloserClick)
        return ()=> window.removeEventListener("click", handleCloserClick)
    })
    const updateTask = ()=>{
        alert("Updated")
    }
    return (
        <>
        <div ref={containerRef} className="container-edittask absolute z-10 rounded-2xl w-72 h-screen top-0 right-0 p-2">
            {task.isLoading && task.isFetching && <p className="text-white">Carregando...</p>}
            {!task.isLoading && !task.isRefetching &&
            <div className="card">
                <div className="card-header border-none outline-none p-2 flex justify-start items-end">
                    <button onClick={handleClose} type="button" className="btn btn-danger">X</button>
                </div>
                <div className="card-body outline-none text-white">
                    <form onSubmit={handleSubmit(updateTask)}>
                        <div className="form-group">
                            <label htmlFor="">Título</label>
                            <input type="text" {...register('title')} className="form-control" value={task.data[0].title} placeholder="Digite um título"/>
                            <input type="text" {...register('id', {valueAsNumber: true})} value={task.data[0].id} className="form-control" placeholder="Digite um título"/>
                            {errors.title && 
                                <small>{errors.title.message}</small>
                            }
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Descrição</label>
                            <input type="text" {...register('description')} value={task.data[0].description} className="form-control" placeholder="Digite uma descrição"/>
                            {errors.description && 
                                <small>{errors.description.message}</small>
                            }
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Descrição</label>
                            <input type="date" {...register('enddate', {valueAsDate:true})} value={`${convertDate(new Date(task.data[0].enddate).toLocaleDateString('pt-br'))}`} className="form-control"/>
                            
                            {errors.enddate && 
                                <small>{errors.enddate.message}</small>
                            }
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Prioridade</label>
                            <select className="form-select" {...register('priority', {valueAsNumber:true})} id="">
                                <option selected={`${task.data[0].priority == 0 ? 'selected':''}`} value="0">Baixa</option>                            
                                <option selected={`${task.data[0].priority == 1 ? 'selected':''}`} value="1">Média</option>                            
                                <option selected={`${task.data[0].priority == 2 ? 'selected':''}`} value="2">Alta</option>                            
                            </select>                            
                            {errors.priority && 
                                <small>{errors.priority.message}</small>
                            }
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Categoria</label>
                            <select className="form-select" {...register('idcategory', {valueAsNumber:true})} id="">
                                {!categories.isLoading && 
                                categories.data.map((category)=>{
                                    return(
                                        <option selected={`${task.data[0].idcategory == category.id ? 'selected':''}`} value={category.id}>{category.title}</option>                            
                                    )
                                })
                                }                          
                            </select>                            
                            {errors.idcategory && 
                                <small>{errors.idcategory.message}</small>
                            }
                        </div>
                        <button className="btn btn-primary mt-2">Atualizar</button>
                    </form>
                </div>
            </div>
            }
        </div>
        
        </>
    )
}