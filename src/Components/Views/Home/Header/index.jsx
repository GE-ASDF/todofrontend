import PropTypes from "prop-types";
import {useMenu} from "../../../../Contexts/MenuContext"
import Menu from "../../../UI/Menu";
import {Link, Outlet, useLocation} from "react-router-dom"
import {useTheme} from "../../../../Contexts/ContextsLoaders/useTheme"
import {useForm} from "react-hook-form"
import { useEffect, useState } from "react";
import { useLogged } from "../../../../Contexts/LoggedContext";
import FormAddTask from "../FormAddTask";
import { useTasks } from "../../../../Contexts/TasksContext";
import { convertDate } from "../../../../utils/utils";
import Profile from "../Profile";
import Task from "../../../UI/Task";
import hookShowDetails from "../../../../hooks/hookShowDetails";
import hookDoneTask from "../../../../hooks/hookDoneTask";



export default function Header(){
    const data = useTasks();  
    const themeCtx = useTheme()  
    const {detailsShow, showDetails} = hookShowDetails();
    const {done} = hookDoneTask();
    const local = useLocation().pathname.split("/app").filter(el => el);
    
    const [showProfile, setShowProfile] = useState(false);
    const [showPlusInfo, setShowPlusInfo] = useState(false);
    const tasks = data.tasks.length > 0 ? data.tasks.filter((task)=>{
        if(convertDate( new Date(task.enddate).toLocaleDateString('pt-br')) <= convertDate(new Date().toLocaleDateString('pt-br')) && !task.done){
            return task;
        }
    }):[];

    const [notificationsShow, setNotificationsShow] = useState(false);
    const todayTasksQtd = tasks.length;
    const [addTaskForm, setAddTaskForm] = useState(false);
    const {user} = useLogged();
    const dataUser = JSON.parse(user);
    const {reset} = useForm();
    const {showMenu, setShowMenu} = useMenu();
    const {theme, setTheme} = useTheme();

    const handleShowMenu = ()=>{
        setShowMenu(!showMenu)
    }
    
    const handleShowAddTask = ()=>{
        setAddTaskForm(!addTaskForm);
        reset();
    }

    const handleSetTheme = ()=>{
        const themeToSet = theme =='dark' ? 'light':'dark';
        setTheme(themeToSet);
    }

    useEffect(()=>{
        const closePlusInfo = (e)=>{
            if(e.key){
                if(e.key.toLowerCase() == 'escape'){
                    setShowPlusInfo(false)
                    setNotificationsShow(false);
                    
                }
            }
        }
        const closeOutSidePlus = (e)=>{
            if(e.target.classList.contains("show-plus-profile-open")){
                setShowPlusInfo(!showPlusInfo)

            }else{
                if(showPlusInfo && e.target.closest(".show-plus-profile") === null){
                    setShowPlusInfo(false)
                }
            }
            if(e.target.classList.contains("notifications-open")){
                setNotificationsShow(!notificationsShow);
            }else{
                if(notificationsShow && e.target.closest(".notifications-show-container") === null){
                    setNotificationsShow(false)
                }
            }
        }
        document.addEventListener("keyup", closePlusInfo);
        document.addEventListener("click", closeOutSidePlus);
        return ()=> 
        {
            document.removeEventListener("keyup", closePlusInfo)
            document.removeEventListener("click", closeOutSidePlus)
        }
    },[showPlusInfo, notificationsShow])
  
    return (
        <div className={`flex justify-between  text-white bg-orange-700 p-1`}>
            <div className="flex gap-2 mx-2">
                {!showMenu &&
                    <Menu onClick={handleShowMenu} />
                }
                <Link to="/app/dashboard">
                    <i className="bi cursor-pointer bi-house-door"></i>
                </Link>
                {theme == 'dark' && <i onClick={handleSetTheme} className="bi cursor-pointer bi-brightness-high"></i>}
                {theme != 'dark' && <i onClick={handleSetTheme} className="bi cursor-pointer bi-moon-stars"></i>}
                
            </div>
            <div className="flex gap-2 mx-2">
                <i onClick={handleShowAddTask} className="bi form-add-task-open cursor-pointer bi-plus-lg"></i>
                <i className="bi notifications-open cursor-pointer relative bi-bell">
                    <span style={{fontSize:'10px'}} className="absolute text-sm text-yellow-300">
                        {todayTasksQtd > 0 && todayTasksQtd}
                    </span>
                </i>
                {notificationsShow &&
                    <div className={`absolute z-10 border rounded-lg max-h-64 overflow-y-auto ${themeCtx.theme == 'dark' ? 'dark':''} p-2 top-10 right-10 notifications-show-container`}>
                        <h2 className={`fw-bold text-lg ${themeCtx.theme == 'dark' ? 'dark':"text-black"}`}>{tasks.length > 0 ? "Notificações":"Sem notificações"}</h2>
                        {tasks.length > 0 && tasks.map((task) =>{
                            return (
                                <Task local={local[0]} onClick={showDetails} className={`${themeCtx.theme == "dark" ? "":"bg-light text-black"}`} key={task.id} done={done} detailsShow={detailsShow} task={task} />
                            )
                        })}
                    </div>
                }
                <i className="bi show-plus-profile-open cursor-pointer bi-three-dots-vertical"></i>
                {addTaskForm &&
                    <FormAddTask addTaskForm={addTaskForm} setAddTaskForm={setAddTaskForm} iduser={dataUser.id} />
                }
                {showPlusInfo &&
                <div className={`absolute z-10 top-7 py-2 right-5 w-20 px-1 bg-slate-50 flex flex-col gap-1 rounded-ee-lg rounded-es-lg rounded-ss-lg show-plus-profile`}>
                    <span onClick={()=> {
                        setShowProfile(!showProfile)
                        setShowPlusInfo(false)
                    }} className="bg-slate-100 text-left cursor-pointer p-1 block border-b-slate-500 text-black text-sm">Perfil</span>
                </div>
                }
                {showProfile && <Profile setShowProfile={setShowProfile} />}
            </div>
        </div>
    )
}


Header.propTypes = {
    children: PropTypes.element
}