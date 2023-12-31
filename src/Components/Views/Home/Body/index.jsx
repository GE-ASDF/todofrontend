import { Link, Outlet, useNavigate } from "react-router-dom";
import "./style.css";
import Menu from "../../../UI/Menu";
import {useMenu} from "../../../../Contexts/MenuContext";
import Cookies from "js-cookies";
import { useTheme } from "../../../../Contexts/ContextsLoaders/useTheme";
import { useLogged } from "../../../../Contexts/LoggedContext";
import { useLogoutMutation } from "../../../../utils/mutations";

export default function Body(){
    const {theme} = useTheme();
    const {showMenu, setShowMenu} = useMenu();
    const navigate = useNavigate();
    const {setUserLogged}= useLogged();
    const logoutMutation = useLogoutMutation();
    const handleShowMenu = ()=>{
        setShowMenu(!showMenu)
    }
    const handleLogout = async ()=>{
        logoutMutation.mutate()
        if(logoutMutation.status != 'pending'){
            Cookies.removeItem("LOGIN_USER")
            Cookies.removeItem("token")
            setUserLogged('null')
            navigate("/")
        }
    }
    
    return(
        <>
        <div className="flex  w-100 h-100">    
            {showMenu && 
                <div className={`left-side border-r w-48 p-1 ${theme == 'dark' ? 'dark':''} bg-slate-200`}>
                    <div className="flex m-2 justify-between items-center text-2xl fw-bold p-1">
                        <span>Menu</span>
                        <Menu onClick={handleShowMenu} />
                    </div>
                    <div className="p-1">
                        <p className="text-sm py-2">Tarefas</p>
                        <div className="flex h-100 flex-col justify-start items-start">
                            <ul className="w-100 flex gap-1 list-group">
                                <li className="list-group-item">
                                    <Link className="d-flex gap-2" to="/app/today">
                                        <i className="bi bi-card-checklist"></i>
                                        <span>Hoje</span>
                                    </Link>
                                </li>
                                <li className="list-group-item">
                                    <Link className="d-flex gap-2" to="/app/all">
                                        <i className="bi bi-list-task"></i>
                                        <span>Todas</span>
                                    </Link>
                                </li>
                                
                                <li className="list-group-item">
                                    <Link className="d-flex gap-2" to="/app/bypriority">
                                        <i  className="bi  bi-arrow-counterclockwise"></i>
                                        <span>Pendentes</span>
                                    </Link>
                                </li>
                                <li className="list-group-item">
                                    <Link className="d-flex gap-2" to="/app/stickywall">
                                        <i className="bi bi-sticky"></i>
                                        <span>Anotações</span>
                                    </Link>
                                </li>
                            </ul>
                            <div onClick={handleLogout} className="flex align-self-start my-2 gap-1 cursor-pointer">
                                <i className="bi bi-box-arrow-left"></i>
                                <span>Sair</span>
                            </div>
                        </div>
                    </div>
                </div>
            }
            <div className={`overflow-auto p-4 right-side flex-1  ${theme == 'dark' ? 'dark':''}`}>
                <Outlet  />
            </div>
        </div>
        </>
    )
}