import { useTheme } from "../../../../Contexts/ContextsLoaders/useTheme";
import {useTasks} from "../../../../Contexts/TasksContext";
import { convertDate } from "../../../../utils/utils";
import {RadialBarChart, PolarAngleAxis, RadialBar} from "recharts";
import { useLogged } from "../../../../Contexts/LoggedContext";
import { Outlet } from "react-router-dom";
export default function Dashboard(){
    const {tasks} = useTasks();
    const {user} = useLogged();
    const dataUser = JSON.parse(user)
    const concluidas = tasks.length > 0 ? ((tasks.filter((task)=> task.done > 0).length / tasks.length) * 100).toFixed(2):[];
 
    const tarefasConcluidas = tasks.length > 0 ?  tasks.filter((task)=> task.done > 0).length:[].length;
    const tarefasAtrasadas =  tasks.length > 0 ? tasks.filter((task)=> {
        if(convertDate(new Date(task.enddate).toLocaleDateString('pt-br')) <= convertDate(new Date().toLocaleDateString('pt-br')) && !task.done){
            return task;
        }
    }).length:[].length;
    const themeCtx = useTheme();
    const chartData = [{name:'% de conclusão', value:concluidas}]
    return (
        <div className="flex flex-wrap flex-col p-1 m-2">
            <h1 className="sm:text-4xl md:text-xl fw-bold">{dataUser?.name ? "Bem vindo, "+dataUser.name.split(" ")[0]:"Dashboard"}</h1>
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
            <div className="p-2 mt-4">
                <RadialBarChart layout="radial"  className={`${themeCtx.theme == 'dark' ? 'dark':''}`}  startAngle={0}  endAngle={180} width={250} height={250} cx={125} cy={150} innerRadius={100} outerRadius={500} barSize={15} data={chartData}>
                    <PolarAngleAxis label={false}  type="number" domain={[0, 100]} />
                    <RadialBar className="bg-danger" startAngle={0} fill="green" background clockWise dataKey="value" />
                    <text x="50%" y="50%" textAnchor="middle" fill={`${themeCtx.theme == 'dark' ? '#fff':'#000'}`} dominantBaseline="middle" fontSize="24px">
                        {`${chartData[0].value}%`}
                    </text>
                    <text x="50%" y="40%" textAnchor="middle" fill={`${themeCtx.theme == 'dark' ? '#fff':'#000'}`} dominantBaseline="middle" fontSize="18px">
                        {`${chartData[0].name}`}
                    </text>
                </RadialBarChart>
            </div>
            <Outlet />
        </div>
    )
}