import PropTypes from "prop-types";
import {useMenu} from "../../../../Contexts/MenuContext"
import Menu from "../../../UI/Menu";
import {Link, useLocation} from "react-router-dom"
import {useTheme} from "../../../../Contexts/ContextsLoaders/useTheme"
import {useForm} from "react-hook-form"
import { useState } from "react";
import { useLogged } from "../../../../Contexts/LoggedContext";
import FormAddTask from "../FormAddTask";
import { useTasks } from "../../../../Contexts/TasksContext";
import { convertDate } from "../../../../utils/utils";
import { useAlert } from "../../../../Contexts/AlertContext";
import HTTP from "../../../../api/http";
import { useSticky } from "../../../../Contexts/StickyContext";


export default function Header(props){
    const data = useTasks();
    const {handleSetAlert} = useAlert();
    
    const tasks = data.tasks.length > 0 ? data.tasks.filter((task)=>{
        if(convertDate( new Date(task.enddate).toLocaleDateString('pt-br')) <= convertDate(new Date().toLocaleDateString('pt-br'))){
            return task;
        }
    }):[];
    const local = useLocation().pathname.split("/");
    const stickies = useSticky();
    const todayTasksQtd = tasks.length;
    const [addTaskForm, setAddTaskForm] = useState(false);
    const {user} = useLogged();
    const dataUser = JSON.parse(user);
    const {reset} = useForm();
    const {showMenu, setShowMenu} = useMenu();
    const {theme, setTheme} = useTheme();
    const [sticky, setSticky] = useState({
        iduser: dataUser.id,
        title:'',
        body:'',
    })
    const handleShowMenu = ()=>{
        setShowMenu(!showMenu)
    }
    const handleShowAddTask = ()=>{
        setAddTaskForm(!addTaskForm);
        reset();
    }
    const handleTypingSticky = (e)=>{
        if(e.target.value.length <= 1024){
            setSticky({...sticky, [e.target.name]:e.target.value.trim()})
        }else{
            setSticky({...sticky, [e.target.name]:''})
            e.target.value = ''
            handleSetAlert({type:"danger", message:"O campo só pode ter 1024 caracteres."})
            return;
        }
    }
    const handleSetTheme = ()=>{
        const themeToSet = theme =='dark' ? 'light':'dark';
        setTheme(themeToSet);
    }

    const saveSticky = async (e)=>{
        e.preventDefault();
   
        if(!sticky.title || !sticky.body){
            handleSetAlert({type:'danger', message:`O campo de título e anotação não podem estar vazios.`})
            return;
        }
        const http = new HTTP('/admin/sticky/create', 'POST', sticky);
        const response = await http.http();
        if(response.error){
            handleSetAlert({type:'danger', message:`Não foi possível inserir a anotação. Verifique os dados e tente novamente.`})
            return;
        }else if(response.error == false){
            handleSetAlert({type:'success', message:response.message})
            stickies.setSticky(true);
            return;
        }
    }
    
    return (
        <div className={`flex justify-between  text-white bg-orange-700 p-1`}>
            <div className="flex gap-2 mx-2">
                {!showMenu &&
                    <Menu onClick={handleShowMenu} />
                }
                <Link to="/app">
                    <i className="bi cursor-pointer bi-house-door"></i>
                </Link>
                {theme == 'dark' && <i onClick={handleSetTheme} className="bi cursor-pointer bi-brightness-high"></i>}
                {theme != 'dark' && <i onClick={handleSetTheme} className="bi cursor-pointer bi-moon-stars"></i>}
                
            </div>
            <div className="flex gap-2 mx-2">
                <i onClick={handleShowAddTask} className="bi cursor-pointer bi-plus-lg"></i>
                <i className="bi cursor-pointer relative bi-bell">
                    <span style={{fontSize:'10px'}} className="absolute text-sm text-yellow-300">
                        {todayTasksQtd > 0 && todayTasksQtd}
                    </span>
                </i>
                {addTaskForm && !local.includes("stickywall") &&
                    <FormAddTask addTaskForm={addTaskForm} setAddTaskForm={setAddTaskForm} iduser={dataUser.id} />
                }
                {addTaskForm && local.includes("stickywall") &&
                    <div className={`absolute ${theme == "dark" ? "dark":"bg-slate-500 text-light"} border p-2 rounded-start z-1 rounded-b-lg top-6 right-12`}>
                    <form onSubmit={saveSticky} className="flex flex-col gap-2">
                        <h2>Add anotação</h2>
                        <div className="form-group">
                            <label htmlFor="">Título:</label>
                            <input onChange={handleTypingSticky} className="form-control" placeholder="Título da anotação" name="title"/>                        
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Anotação:</label>
                            <textarea onChange={handleTypingSticky} placeholder="Digite sua anotação aqui" name="body" id=""  cols="30" rows="5" className="form-control"></textarea>
                        </div>
                        <button className="btn btn-primary">Add</button>
                    </form>
                </div>
                }
            </div>
        </div>
    )
}


Header.propTypes = {
    children: PropTypes.element
}