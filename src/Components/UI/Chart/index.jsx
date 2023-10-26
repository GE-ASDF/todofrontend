import { useState } from "react";
import { Bar, BarChart, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useTheme } from "../../../Contexts/ContextsLoaders/useTheme";
import { useTasks } from "../../../Contexts/TasksContext";
import { getYears } from "../../../utils/utils";
import "./style.css"
import Loader from "../Loader";

export function createDataForBarChart(tasks, actualYear){
    const dataPerMonth = [...Array(12).keys()].map((i)=>{
        const month = new Date(actualYear, i, 1).toLocaleDateString('pt-br',{
            month:"short"
        })
        return {
            month,
            qtd: tasks.filter((task)=>{
                const dataTask = new Date(task.enddate).toLocaleString('pt-br', {year:"2-digit", month:"2-digit"})
                const dataTask2 = new Date(actualYear, i).toLocaleDateString("pt-br", {year:"2-digit", month:"2-digit"})
                if(dataTask == dataTask2){
                    return task;
                }
            }).length,
            doned:tasks.filter((task)=>{
                const dataTask = new Date(task.enddate).toLocaleDateString('pt-br', {year:"numeric", month:"short"})
                const dataTask2 = new Date(actualYear, i,1).toLocaleDateString("pt-br", {year:"numeric", month:"short"})
                if(dataTask == dataTask2 && task.done > 0){
                    return task;
                }
            }).length,
        }
    })
    const result = dataPerMonth.map((i) =>{
        return {
            month: i.month,
            qtd:i.qtd,
            doned: i.doned,
            "Feitas": i.qtd > 0 ? Math.ceil((i.doned / i.qtd) * 100):0,
            "Não feitas": i.qtd > 0 ? Math.ceil(((i.qtd - i.doned) / i.qtd) * 100):0
        }
    })
    return result;
}

export default function MyBarChart({actualYear, setActualYear}){
    const themeCtx = useTheme();
    const {tasks} = useTasks();
    const years = !tasks.isFetching && !tasks.data.error ? getYears(tasks.data):[];
    const dataPerMonth = !tasks.isFetching && !tasks.data.error ? createDataForBarChart(tasks.data, actualYear):[];

    return(
        <div className={`flex col-lg-6 col-sm-6 flex-col gap-2 rounded shadow-md ${themeCtx.theme == 'dark' ? 'dark':''}`}>
        <h1>Resultado anual</h1>
        <div className="form-group flex gap-2">
            <label htmlFor="">Ano:</label>
            <select onChange={(e)=> setActualYear(e.target.value) } className="form-select p-1 w-52" defaultValue={`${actualYear}`} name="year" id="">
            {years.map((year)=>{
                return <option key={year} selected={`${year == actualYear ? "selected":""}`} defaultValue={`${year}`} value={`${year}`}>{year}</option>
            })}
            </select>
        </div>
        <div className="relative">
        {tasks.isLoading && <p>Carregando gráfico</p>}
        {tasks.isError && <p>Não foi possível carregar o gráfico.</p>}
        
        <BarChart  width={400} height={180} data={dataPerMonth}>
            <Bar fill={`green`} dataKey="Feitas"/>
            <Bar fill={`red`} dataKey="Não feitas" />
            <Tooltip />
            <XAxis dataKey="month" />
            <YAxis />
            <Legend />
        </BarChart>
        </div>
        </div>
    )
}