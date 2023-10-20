import { Link } from "react-router-dom";
import {useTheme} from "../../../Contexts/ContextsLoaders/useTheme";
import { useState } from "react";
import hookRemoveTask from "../../../hooks/hookRemoveTask";
import ConfirmationScreen from "../ConfirmationScreen";

export default function Task({task, editTask, detailsShow, onClick,done}){
    const priorities = ['Baixa', 'Média', 'Alta'];
    const themeCtx = useTheme();
    const {removeTask} = hookRemoveTask();
    const [showConfirmationScreen, setShowConfirmationScreen] = useState(false);
    const [idTaskToDelete, setIdTaskToDelete] = useState('');

    const handleDeleteRegister = (id)=>{
        setIdTaskToDelete(id);
        setShowConfirmationScreen(!showConfirmationScreen)
    }

    return (
        <>
        {showConfirmationScreen &&
            <ConfirmationScreen showConfirmationScreen={showConfirmationScreen}  setShowConfirmationScreen={handleDeleteRegister} id={idTaskToDelete} onClick={removeTask} />        
        }
        <div key={task.id}  className="flex flex-wrap gap-2 rounded-md cursor-pointer flex-row border p-2 mt-4">
            <h6 className={`${task.priority == 0 ? `${themeCtx.theme == 'dark' ? 'bg-blue-700':'bg-blue-700 text-white'}`:task.priority == 1 ? `${themeCtx.theme == 'dark' ? 'bg-yellow-700 text-white':'bg-yellow-700 text-white'}`:themeCtx.theme == 'dark' ? 'bg-red-600':'bg-red-600 text-white'} p-1 rounded`}>Prioridade: {priorities[task.priority]}</h6>
            <div onClick={() => onClick(task.id)} className="flex w-100 flex-col">
                <h5 className="fw-bold text-sm">{task.title}</h5>
                {detailsShow.includes(task.id) && 
                    <>
                        <span className="mx-2">Descrição: {task.description}</span>
                    </>
                }
            <div className="flex flex-wrap gap-2">
            <div className="flex  items-center gap-1">
                <i className="bi bi-calendar-event"></i>
                <span className="text-sm">
                {new Date(task.enddate).toLocaleDateString('pt-br')}</span>
            </div>
            <div className="flex  items-center gap-1">
                <i className="bi bi-bookmark"></i>
                <span className="text-sm">
                {task.category_title}</span>
            </div>
            </div>
            
            </div>
                <div className="flex flex-row justify-start items-start gap-2">
                    {task.done == 0 && <span className="btn btn-sm btn-warning" onClick={()=> done(task.id)}>{task.done == 0 && 'Pendente'}</span>}
                    {task.done > 0 && <span className="btn btn-sm btn-success" onClick={()=> done(task.id)}>{task.done > 0 && 'Feito'}</span>}
                    <span className="btn btn-sm btn-danger" onClick={()=> handleDeleteRegister(task.id)}>Remover</span>
                    <Link className="btn btn-sm btn-primary" to={`edittask/${task.id}`}>Editar</Link>
                </div>
            </div>
            </>
    )
}