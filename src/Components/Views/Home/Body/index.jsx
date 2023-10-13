import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "./style.css";
export default function Body(){
    const [showMenu, setShowMenu] = useState(true);
    const handleShowMenu = ()=>{
        setShowMenu(!showMenu);
    }
    return(
        <>
        {!showMenu &&
            <div className="absolute top-8 left-1">
                <i onClick={handleShowMenu} className="bi cursor-pointer cursor-pointr text-2xl bi-list"></i>
            </div>
        }
        <div className="flex w-100 h-100">    
            {showMenu && 
                <div className="left-side w-48 p-1 bg-slate-200">
                    <div className="flex m-2 justify-between items-center text-2xl fw-bold p-1">
                        <span>Menu</span>
                        <i onClick={handleShowMenu} className="bi cursor-pointer cursor-pointr text-2xl bi-list"></i>
                    </div>
                    <div className="p-1">
                        <p className="text-sm py-2">Tarefas</p>
                        <div className="flex flex-col justify-start items-start">
                            <ul className="w-100 list-group">
                                <li className="list-group-item">
                                    <Link className="d-block" to="/app/today">
                                        <i className="bi bi-card-checklist"></i>
                                        <span>Hoje</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            }
            <div className="right-side flex-1 p-1 bg-warning">
                <Outlet />
            </div>
        </div>
        </>
    )
}