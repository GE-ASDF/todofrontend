import { useForm } from "react-hook-form";
import { useAlert } from "../../../../Contexts/AlertContext";
import HTTP from "../../../../api/http";
import Input, { Select, Option } from "../../../UI/Forms/Input"
import { useEffect, useState } from "react";
import { useTheme } from "../../../../Contexts/ContextsLoaders/useTheme";
import { useLogged } from "../../../../Contexts/LoggedContext";
import { useTasks } from "../../../../Contexts/TasksContext";

export default function FormAddTask({iduser, setAddTaskForm, addTaskForm}){
    const [categories, setCategories] = useState(()=>[]);
    const {setTask} = useTasks();
    const {handleSetAlert} = useAlert();
    const {theme} = useTheme();
    const {control, handleSubmit, reset} = useForm({description:'',title:'',enddate:'',idcategory:'',priority:''});
    const saveTask = async ()=>{
        const data = control._formValues;
        data.iduser = iduser;
        const http = new HTTP('/admin/tasks/create', 'POST', data);
        const response = await http.http();
        if(response.error == false){
            handleSetAlert({type:'success', message:'Uma tarefa foi adicionada com sucesso!'})
            setTask(true);
            // reset();
        }else if(response.error){
            if(response.type == 'fields'){
                response.errors.forEach(erro =>{
                    handleSetAlert({type:'danger', message:erro.msg})
                })
            }else{
                handleSetAlert({type:'danger', message:'A tarefa não foi inserida.'})
            }
        }
    }
    const getCategories = async()=>{
        const http = new HTTP('/admin/categories/all');
        const response = await http.http();
        setCategories(response);
    }

    useEffect(()=>{
        getCategories();
    },[])

    useEffect(()=>{
        const closeModals = (e)=>{
            if(e.key.toLowerCase() == 'escape'){
                setAddTaskForm(false)
                reset();
            }
        }
        document.addEventListener("keyup", closeModals)
        return ()=> removeEventListener('keyup', closeModals);
    },[addTaskForm])

    return (
        <div className={`absolute ${theme == "dark" ? "dark":"bg-slate-500 text-light"} border p-2 rounded-start rounded-b-lg top-6 right-12`}>
        <form onSubmit={handleSubmit(saveTask)} className="flex flex-col gap-2">
            <h2>Add tarefa</h2>
            <Input defaultValue="" label="Título" placeholder="Título da tarefa" name="title" rules={{required:"Este campo é obrigatório"}} control={control}></Input>
            <Input defaultValue="" label="Descrição" placeholder="Descrição da tarefa" name="description" control={control}></Input>
            <Input type="date" defaultValue="" label="Data de fim"  name="enddate" control={control} rules={{required:"Este campo é obrigatório"}}></Input>
            <div className="flex gap-2">
                <Input defaultChecked="0" type="radio" className={`form-check`} rules={{required:"Escolha uma prioridade"}} value="0" label="Baixa" name="priority" control={control}></Input>
                <Input type="radio" className={`form-check`} rules={{required:"Escolha uma prioridade"}} value="1" label="Média" name="priority" control={control}></Input>
                <Input type="radio" className={`form-check`} rules={{required:"Escolha uma prioridade"}} value="2" label="Alta" name="priority" control={control}></Input>
            </div>
                <div>
                <Select defaultValue={`${categories.length > 0 ? categories[0].id:1}`} label="Categoria" name="idcategory" control={control}>
                    {categories.length && categories.map(category =>{
                        return (
                                <Option key={category.title + category.id} value={category.id}>{category.title}</Option>                                                           
                            )
                        })
                    }
                </Select>
                </div>
            <button className="btn btn-primary">Add</button>
        </form>
    </div>
    )
}