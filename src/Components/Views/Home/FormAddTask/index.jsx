import { useForm } from "react-hook-form";
import { useAlert } from "../../../../Contexts/AlertContext";
import Input, { Select, Option } from "../../../UI/Forms/Input"
import { useEffect, useState } from "react";
import { useTheme } from "../../../../Contexts/ContextsLoaders/useTheme";
import { useTasks } from "../../../../Contexts/TasksContext";
import { useAddTaskMutation } from "../../../../utils/mutations";
import { useCategories } from "../../../../utils/queries";

export default function FormAddTask({iduser, setAddTaskForm, addTaskForm}){
    const addTaskMutation = useAddTaskMutation();
    const categories = useCategories();
    const {setTask} = useTasks();
    const {handleSetAlert} = useAlert();
    const {theme} = useTheme();
    const {control, handleSubmit, reset} = useForm({description:'',title:'',enddate:'',idcategory:'',priority:''});
    const saveTask = async ()=>{
        control._formValues.iduser = iduser;
        addTaskMutation.mutate(control._formValues, {
            onSuccess:(response)=>{
                if(response.error == false){
                    handleSetAlert({type:'success', message:'Uma tarefa foi adicionada com sucesso!'})
                    setTask(true);
                    reset();
                }else if(response.error){
                    if(response.type == 'fields'){
                        response.errors.forEach(erro =>{
                            handleSetAlert({type:'danger', message:erro.msg})
                        })
                    }else{
                        handleSetAlert({type:'danger', message:'A tarefa não foi inserida.'})
                    }
                }
            },
        })
    }

    useEffect(()=>{
        const closeModals = (e)=>{
            if(e.key.toLowerCase() == 'escape'){
                setAddTaskForm(false)
                reset();
            }
        }
        const closeShowModalOnOutsideClick = (e)=>{
            if(e.target.classList.contains('form-add-task-open')){
                setAddTaskForm(true);
            }else{
                if(addTaskForm && e.target.closest('.form-add-task') == null){
                    setAddTaskForm(false)
                }
            }
        }
        document.addEventListener("keyup", closeModals)
        document.addEventListener("click", closeShowModalOnOutsideClick)
        return ()=>{
            document.removeEventListener('keyup', closeModals)
            document.removeEventListener("click", closeShowModalOnOutsideClick)
        };
    },[addTaskForm])
   
    return (
        <div style={{zIndex:"9"}} className={`absolute ${theme == "dark" ? "dark":"bg-slate-500 text-light"}  border p-2 rounded-start rounded-b-lg  top-6 right-12 form-add-task`}>
        <form onSubmit={handleSubmit(saveTask)} className="flex flex-col gap-2">
            <h2>Add tarefa</h2>
            <Input defaultValue="" label="Título" placeholder="Título da tarefa" name="title" rules={{required:"Este campo é obrigatório"}} control={control}></Input>
            <Input defaultValue="" label="Descrição" placeholder="Descrição da tarefa" name="description" control={control}></Input>
            <Input type="date" defaultValue="" label="Data de fim"  name="enddate" control={control} rules={{required:"Este campo é obrigatório"}}></Input>
            <div className="flex flex-col" >
                <Select defaultValue="0" name="priority" label="Prioridade" control={control}>
                    <Option value="0">Baixa</Option>                                                           
                    <Option value="1">Média</Option>                                                           
                    <Option value="2">Alta</Option>                                                           
                </Select>
            </div>
                <div>
                <Select defaultValue={`${categories.length > 0 ? categories[0].id:1}`} label="Categoria" name="idcategory" control={control}>
                    {!categories.isLoading && categories.data.map(category =>{
                        return (
                                <Option key={category.title + category.id} value={category.id}>{category.title}</Option>                                                           
                            )
                        })
                    }
                </Select>
                </div>
            <button disabled={`${addTaskMutation.status == 'pending' ? "disabled":""}`} className="btn btn-primary">Add</button>
        </form>
    </div>
    )
}