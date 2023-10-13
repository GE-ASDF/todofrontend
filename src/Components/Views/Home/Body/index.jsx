import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Dashboard from "../Dashboard";
import Menu from "../../../UI/Menu";
import {useMenu} from "../../../../Contexts/MenuContext"

import "./style.css";
import { useTheme } from "../../../../Contexts/ThemeContext";
export default function Body(){
    const {theme} = useTheme();
    const {showMenu, setShowMenu} = useMenu();
    const local = useLocation().pathname.split("/app").filter((l) => l);
    const handleShowMenu = ()=>{
        setShowMenu(!showMenu)
    }
    return(
        <>
        <div className="flex w-100 h-100">    
            {showMenu && 
                <div className={`left-side border-r w-48 p-1 ${theme == 'dark' ? 'dark':''} bg-slate-200`}>
                    <div className="flex m-2 justify-between items-center text-2xl fw-bold p-1">
                        <span>Menu</span>
                        <Menu onClick={handleShowMenu} />
                    </div>
                    <div className="p-1">
                        <p className="text-sm py-2">Tarefas</p>
                        <div className="flex flex-col justify-start items-start">
                            <ul className="w-100 list-group">
                                <li className="list-group-item">
                                    <Link className="d-flex gap-2" to="/app/today">
                                        <i className="bi bi-card-checklist"></i>
                                        <span>Hoje</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            }
            <div className={`right-side flex-1 p-1 ${theme == 'dark' ? 'dark':''}`}>
                {local.length <= 0 && <Dashboard />}
                {local.length > 0 && <Outlet />}
            </div>
        </div>
        </>
    )
}