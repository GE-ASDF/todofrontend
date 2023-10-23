import { useState } from "react";
import { useTasks } from "../../../Contexts/TasksContext";
import "./style.css"

export function getYears(tasks = []){
    const oldYears = tasks.map((task)=>{
        return new Date(task.enddate).toLocaleDateString('pt-br', {year:"numeric"})
    })
    const newYears = oldYears.filter( (year,index) =>{
        if(oldYears.indexOf(year) === index){
            return year;
        }
    })
    return newYears;
}

export default function Chart(){
    const {tasks} = useTasks();
    const [actualYear, setActualYear] = useState(new Date().getFullYear())
    const years = getYears(tasks);
 
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
            }).length
        }
    })
   
    return(
        <div id="cart-col"  className="rounded">
            <div className="h-100 overflow-auto">

            <table className="table h-100 table-dark justify-center items-end">
                <thead>
                    <tr>
                        <th>
                        <td className="flex gap-2 items-center  mb-2">
                            <select onChange={(e)=> setActualYear(e.target.value) } className="form-select w-52" defaultValue={`${actualYear}`} name="year" id="">
                            {years.map((year)=>{
                                return <option key={year} selected={`${year == actualYear ? "selected":""}`}  value={`${year}`}>{year}</option>
                            })}
                            </select>
                        </td>
                        <td>
                            <th className="flex gap-1 items-center justify-center">
                                <div className="flex gap-1 items-center justify-center">
                                    <div className="p-2 bg-danger rounded-sm"></div>Não concluídas
                                </div>
                                <div className="flex gap-1 items-center justify-center">
                                    <div className="p-2 bg-success rounded-sm"></div>Concluídas
                                </div>
                            </th>
                        </td>
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-dark relative h-100 justify-center items-end flex gap-2 flex-row">
        
                    <div className="flex z-10 border-none h-100 absolute flex-col-reverse top-0 left-0 w-100">
                        <tr className="border-none bg-transparent h-100">
                            {[...Array(10).keys()].map(i=>{
                                return (
                                    <td key={i} className="flex  border-none gap-1 items-center justify-center">
                                        <span>{(10 - i) * 10}%</span>
                                        <div className="w-100 border-b h-1"></div>
                                    </td>
                                )
                            })}
                        </tr>
                    </div>
                    <div className="flex ml-12 mr-12 h-100">
                    {dataPerMonth.map(data =>{
                        const result = data.qtd > 0 ? Math.ceil((data.doned / data.qtd) * 100):0;
                        const result2 = data.qtd > 0 ? Math.ceil(((data.qtd - data.doned) / data.qtd) * 100):0;
                        return(
                            <tr key={data.month} className="h-100  items-end justify-end">
                                <td className="flex h-100 flex-col-reverse rounded gap-3 text-center">
                                    <div>
                                        {data.month}
                                    </div>
                                    <div style={{zIndex:"9"}} className="flex h-100 gap-1 items-end">
                                        <div title={`${data.month} de ${actualYear}`} style={{height: `${result}%`, width:"100%", maxWidth:"100%", transition:"all 1s ease"}} className={`${result >= 0 && result < 25 ? "bg-danger":result >= 25 && result < 50 ? "bg-warning":"bg-success"} rounded p-1 text-xs`}>{result}%</div>
                                        <div title={`${data.month} de ${actualYear}`} style={{height: `${result2}%`, width:"100%", maxWidth:"100%", transition:"all 1s ease"}} className={`${result2 <= 0 && result2 < 25 ? "bg-success":result2 >= 25 && result2 < 50 ? "bg-warning":"bg-danger"} rounded p-1 text-xs`}>{result2}%</div>
                                    </div>

                                </td>
                            </tr>
                        )
                    })}
                    </div>

                </tbody>
            </table>
            </div>

        </div>
    )
}