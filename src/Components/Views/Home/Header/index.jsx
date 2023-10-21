import PropTypes from "prop-types";
import {useMenu} from "../../../../Contexts/MenuContext"
import Menu from "../../../UI/Menu";
import {Link, useLocation} from "react-router-dom"
import {useTheme} from "../../../../Contexts/ContextsLoaders/useTheme"
import {useForm} from "react-hook-form"
import { useEffect, useState } from "react";
import { useLogged } from "../../../../Contexts/LoggedContext";
import FormAddTask from "../FormAddTask";
import { useTasks } from "../../../../Contexts/TasksContext";
import { convertDate } from "../../../../utils/utils";
import Profile from "../Profile";



export default function Header(props){
    const data = useTasks();    
    const [showProfile, setShowProfile] = useState(false);
    const [showPlusInfo, setShowPlusInfo] = useState(false);

    const tasks = data.tasks.length > 0 ? data.tasks.filter((task)=>{
        if(convertDate( new Date(task.enddate).toLocaleDateString('pt-br')) <= convertDate(new Date().toLocaleDateString('pt-br')) && !task.done){
            return task;
        }
    }):[];
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
            if(e.key.toLowerCase() == 'escape'){
                setShowPlusInfo(false)
            }
        }
        document.addEventListener("keyup", closePlusInfo);
        return ()=> document.removeEventListener("keyup", closePlusInfo)
    },[showPlusInfo])
    
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
                <i onClick={()=>setShowPlusInfo(!showPlusInfo)} className="bi cursor-pointer bi-three-dots-vertical"></i>
                {addTaskForm &&
                    <FormAddTask addTaskForm={addTaskForm} setAddTaskForm={setAddTaskForm} iduser={dataUser.id} />
                }
                {showPlusInfo &&
                <div className={`absolute top-7 right-5 w-20 px-1 bg-slate-50 flex flex-col gap-1 rounded-ee-sm rounded-es-md rounded-ss-sm`}>
                    <span onClick={()=> {
                        setShowProfile(!showProfile)
                        setShowPlusInfo(false)
                    }} className="bg-slate-100 text-left cursor-pointer p-1 block border-b-slate-500 text-black text-xs">Perfil</span>
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