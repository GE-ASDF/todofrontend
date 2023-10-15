import { useTheme } from "../../../../Contexts/ContextsLoaders/useTheme";
import {useTasks} from "../../../../Contexts/TasksContext";
import { convertDate } from "../../../../utils/utils";

export default function Dashboard(){
    const {tasks} = useTasks();
    const tarefasConcluidas = tasks.filter((task)=> task.done > 0).length;
    const tarefasAtrasadas = tasks.filter((task)=> {
        if(convertDate(new Date(task.enddate).toLocaleDateString('pt-br')) <= convertDate(new Date().toLocaleDateString('pt-br')) && !task.done){
            return task;
        }
    }).length
    const themeCtx = useTheme();
    return (
        <div className="flex flex-wrap flex-col p-1 m-2">
            <h1 className="sm:text-4xl md:text-5xl fw-bold">Dashboard</h1>
            <div className={`flex  gap-2 flex-wrap rounded p-2 mt-2 ${themeCtx.theme == 'dark' ? 'dark':'bg-slate-100'}  shadow-sm`}>
                <div className="card bg-white w-48">
                    <div className="card-header bg-blue-100">
                        <span>Qtd. tarefas</span>
                    </div>
                    <div className={`card-body`}>
                        <h4 className="text-2xl fw-bold">{tasks.length ?? 0}</h4>

                    </div>
                </div>
                <div className="card bg-white w-48">
                    <div className="card-header bg-green-100">
                        <span>Concluídas</span>
                    </div>
                    <div className="card-body">
                        <h4 className="text-2xl fw-bold">{tarefasConcluidas}</h4>

                    </div>
                </div>
                <div className="card bg-white w-48">
                    <div className="card-header bg-red-100">
                        <span>Atrasadas</span>
                    </div>
                    <div className="card-body">
                        <h4 className="text-2xl fw-bold">{tarefasAtrasadas}</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}