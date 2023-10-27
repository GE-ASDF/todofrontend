import { useEffect, useRef } from "react";
import { Link, useLoaderData, useLocation, useNavigate, useParams } from "react-router-dom";
import "./styles/edittask.css"
import { useForm } from "react-hook-form";
import { z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod"
import { useCategories, useTask } from "../../../utils/queries";
import { useQueryClient } from "@tanstack/react-query";
import { convertDate } from "../../../utils/utils";
import { useUpdateTaskMutation } from "../../../utils/mutations";
import { useAlert } from "../../../Contexts/AlertContext";

const formEditTask = z.object({
    id: z.number(),
    title: z.string().min(2, 'Mínimo 2 caracteres'),
    description: z.string().max(1024, 'Máximo de 1024 caracteres').optional(), 
    enddate: z.coerce.date(),
    idcategory: z.number(),
    priority: z.number(),
})
export default function EditTask(){
    const categories =  useCategories();
    const queryClient = useQueryClient();
    const {handleSetAlert} = useAlert();
    const params = useParams();
    const task = useTask(params.id)
    const datatask = !task.isFetching && task.data[0].enddate ? convertDate(new Date(task.data[0].enddate).toLocaleDateString('pt-br')):"";

    const {register, handleSubmit, reset, getValues, formState:{errors}} = useForm({defaultValues:{}, resolver: zodResolver(formEditTask)});
    const local = useLocation().pathname.split("/edittask/");
    const containerRef = useRef(null);
    const navigate = useNavigate();
    const useUpdateTask = useUpdateTaskMutation();

    useEffect(()=>{
        task.refetch();
    },[])

    const handleClose = ()=>{
        navigate(local[0])
    }

    useEffect(()=>{
        const handleCloserClick = (e)=>{

            if(!e.target.classList.contains("btn-edit")){
                if(e.target.parentElement.closest('.container-edittask') == null){
                    navigate(local[0])
                }
            }
        }
        window.addEventListener("click", handleCloserClick)
        return ()=> window.removeEventListener("click", handleCloserClick)
    })
    const updateTask = ()=>{
        useUpdateTask.mutate(getValues(), {
            onSuccess:(response)=>{
                if(response.error == false){
                    handleSetAlert({type:'success', message:response.message})
                    queryClient.invalidateQueries();
                    reset();
                }else if(response.error){
                    if(response.type == 'fields'){
                        response.errors.forEach(erro =>{
                            handleSetAlert({type:'danger', message:erro.msg})
                        })
                    }else{
                        handleSetAlert({type:'danger', message:response.message})
                    }
                }
            }
        })
    }
    return (
        <div ref={containerRef} className="can-close h-100 z-10 absolute w-100 top-0 right-0">
            <div className="container-edittask w-100 h-100 relative w-100 flex justify-end items-center">
                {task.isLoading && task.isFetching && <p className="text-white">Carregando...</p>}
                {!task.isLoading && !task.isRefetching &&
                <div className="card w-96 h-100">
                    <div className="card-header border-none outline-none p-2 flex justify-start items-start">
                        <button onClick={handleClose} type="button" className="btn btn-danger">X</button>
                    </div>
                    <div className="card-body  outline-none text-white">
                        <h1>Editar tarefa</h1>
                        <form className="mt-2 flex flex-col gap-2" onSubmit={handleSubmit(updateTask)}>
                            <div className="form-group">
                                <label htmlFor="">Título</label>
                                <input type="text" {...register('title')} className="form-control" defaultValue={task.data[0].title} placeholder="Digite um título"/>
                                <input type="hidden" {...register('id', {valueAsNumber: true})} defaultValue={task.data[0].id} className="form-control" placeholder="Digite um título"/>
                                {errors.title && 
                                    <small>{errors.title.message}</small>
                                }
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Descrição</label>
                                <input type="text" {...register('description')} defaultValue={task.data[0].description} className="form-control" placeholder="Digite uma descrição"/>
                                {errors.description && 
                                    <small>{errors.description.message}</small>
                                }
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Descrição</label>
                                <input type="date" {...register('enddate')}  defaultValue={datatask} className="form-control"/>
                                
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
                                            <option key={category.id} selected={`${task.data[0].idcategory == category.id ? 'selected':''}`} value={category.id}>{category.title}</option>                            
                                        )
                                    })
                                    }                          
                                </select>                            
                                {errors.idcategory && 
                                    <small>{errors.idcategory.message}</small>
                                }
                            </div>
                            <button disabled={`${useUpdateTask.status == 'pending' ? 'disabled':''}`} className="btn btn-primary mt-2">{`${useUpdateTask.status == 'pending' ? 'Aguarde...':'Atualizar'}`}</button>
                        </form>
                    </div>
                </div>
                }
            </div>
        
        </div>
    )
}