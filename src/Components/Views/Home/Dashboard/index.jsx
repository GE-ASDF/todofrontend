import { useTheme } from "../../../../Contexts/ContextsLoaders/useTheme";
import {useTasks} from "../../../../Contexts/TasksContext";
import {RadialBarChart, PolarAngleAxis, RadialBar} from "recharts";
import { useLogged } from "../../../../Contexts/LoggedContext";
import { Outlet } from "react-router-dom";
import MyBarChart, { createDataForBarChart } from "../../../UI/Chart";
import { useEffect, useState } from "react";
import { useDashboard } from "../../../../utils/queries";

export default function Dashboard(){
    const dashboard = useDashboard()
    const {tasks} = useTasks();
    const [actualYear, setActualYear] = useState(()=> new Date().getFullYear())
    const {user} = useLogged();
    const dataUser = JSON.parse(user)
    const dataForBarChart = !tasks.isFetching  && tasks.data ? createDataForBarChart(tasks.data, actualYear):[];
    const mesMaisProdutivo = !tasks.isFetching && tasks.data ? dataForBarChart.reduce((max, objeto)=>{
        if(objeto.qtd > max.qtd && objeto.doned > max.doned){
            return objeto;
        }else{
            return max
        }
        // objeto.Feitas > max.Feitas ? objeto:max;
    }, dataForBarChart[0]):[]; 
    const themeCtx = useTheme();
    const chartData = [{name:'% de conclusão', value: !dashboard.isLoading && dashboard.data.percentDoned}]
    const resultByNow = chartData[0].value
    const phrases = ['Não está nada bom 👎', 'Está melhorando... 👏', 'Mostre como faz! 💪', 'INCRÍVEL! Você é o rei da produtividade. 👍']
    useEffect(()=>{
        dashboard.refetch();
    })
    return (
        <>
        <div className="flex flex-wrap flex-col">
            <h1 className="sm:text-4xl md:text-xl fw-bold">{dataUser?.name ? "Bem vindo, "+dataUser.name.split(" ")[0]:"Dashboard"}</h1>
            <div className={`flex gap-2 flex-wrap rounded  mt-2 ${themeCtx.theme == 'dark' ? 'dark':'bg-slate-100'}  shadow-sm`}>
                <div className="card bg-white w-48">
                    <div className="card-header bg-blue-100">
                        <span>Qtd. tarefas</span>
                    </div>
                    <div className={`card-body`}>
                        <h4 className="text-2xl fw-bold">{!dashboard.isLoading && dashboard.data.totalTasks}</h4>
                    </div>
                </div>
                <div className="card bg-white w-48">
                    <div className="card-header bg-green-100">
                        <span>Concluídas</span>
                    </div>
                    <div className="card-body">
                        <h4 className="text-2xl fw-bold">{!dashboard.isLoading && dashboard.data.qtdTasksDoned}</h4>
                    </div>
                </div>
                <div className="card bg-white w-48">
                    <div className="card-header bg-red-100">
                        <span>Atrasadas</span>
                    </div>
                    <div className="card-body">
                        <h4 className="text-2xl fw-bold">{!dashboard.isLoading && dashboard.data.qtdLateTasks}</h4>
                    </div>
                </div>
                <div className="card bg-white w-48">
                    <div className="card-header bg-yellow-100">
                        <span>Anotações</span>
                    </div>
                    <div className="card-body">
                        <h4 className="text-2xl fw-bold">
                            {!dashboard.isLoading && dashboard.data.totalStickies}
                        </h4>
                    </div>
                </div>
            </div>
            <div className="row p-2">
                <h1 className="p-2 my-3 flex justify-between rounded w-100 bg-slate-500 text-white">
                    {mesMaisProdutivo['Não feitas'] != 100 && <p>Seu mês mais produtivo foi: {mesMaisProdutivo.month}</p>}
                    {mesMaisProdutivo['Não feitas'] == 100 && <p>Ainda não há tarefas concluídas.</p>}
                </h1>
                <div className="col-lg-6 col-sm-6">
                <h1>{
                resultByNow >= 0 && resultByNow < 24 ?
                phrases[0]:resultByNow >= 24 && resultByNow < 49 ?
                phrases[1]:resultByNow >= 50 && resultByNow < 79 ?
                phrases[2]:phrases[3]
                }
                </h1>
                <RadialBarChart layout="radial"  className={`${themeCtx.theme == 'dark' ? 'dark':''} col-lg-6 col-sm-6`}  startAngle={0}  endAngle={180} width={250} height={250} cx={125} cy={150} innerRadius={100} outerRadius={500} barSize={15} data={chartData}>
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
                <MyBarChart actualYear={actualYear} setActualYear={setActualYear}> </MyBarChart>
            </div>
            <Outlet />
            </div>
        </>
    )
}