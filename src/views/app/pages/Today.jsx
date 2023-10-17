import { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import Tasks from "../../../Components/Views/Home/Tasks";
import { useTasks } from "../../../Contexts/TasksContext";
import { convertDate, dateISOString, getDate, normalizeString } from "../../../utils/utils";
import hookShowDetails from "../../../hooks/hookShowDetails";
import hookDoneTask from "../../../hooks/hookDoneTask";
import FilterTask from "../../../Components/UI/FilterTask";
import hookSetFilter from "../../../hooks/hookSetFilter";
import Loader from "../../../Components/UI/Loader";


export default function Today(){
    const data = useTasks();
    const [tasks, setTasks] = useState([]);
    const {done, loading} = hookDoneTask();
    const {detailsShow, showDetails} = hookShowDetails();
    const {filter, handleSetFilter} = hookSetFilter();
    const [search, setSearch] = useState('');
    const [showDone, setDoneShow] = useState(true);

    useEffect(()=>{
        const taskss = data.tasks.length > 0 ? data.tasks.filter((task)=>{
                if(convertDate( new Date(task.enddate).toLocaleDateString('pt-br')) == convertDate(new Date().toLocaleDateString('pt-br'))){
                    return task;
                }
        }):[];
        return ()=> setTasks(taskss)
    },[data])
    const handleSetSearch = (e)=>{
        setSearch(normalizeString(e.target.value))
    }
    const handleDoneChange = ()=>{
        setDoneShow(!showDone);
    }
    return (
        <div className="flex flex-wrap flex-col p-4">
        {loading && <Loader />}
        <h1 className="sm:text-2xl md:text-5xl fw-bold">Tasks de hoje</h1>
            {tasks.length > 0 &&
                <>
            <FilterTask showDone={showDone} handleDoneChange={handleDoneChange} handleSetSearch={handleSetSearch} handleSetFilter={handleSetFilter} />
            <Tasks showDone={showDone}  search={search} filter={filter} tasks={tasks} done={done} detailsShow={detailsShow} onClick={showDetails} />
                </>
            }
        <Outlet />
        </div>
    )
}