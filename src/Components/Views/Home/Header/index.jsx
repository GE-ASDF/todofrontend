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



export default function Header(props){
    const data = useTasks();    
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
                {addTaskForm &&
                    <FormAddTask addTaskForm={addTaskForm} setAddTaskForm={setAddTaskForm} iduser={dataUser.id} />
                }
         
            </div>
        </div>
    )
}


Header.propTypes = {
    children: PropTypes.element
}