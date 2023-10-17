import { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import Tasks from "../../../Components/Views/Home/Tasks";
import { useTasks } from "../../../Contexts/TasksContext";
import { normalizeString } from "../../../utils/utils";
import FilterTask from "../../../Components/UI/FilterTask";
import hookSetFilter from "../../../hooks/hookSetFilter";
import hookShowDetails from "../../../hooks/hookShowDetails";


export default function All(){
    const data = useTasks();
    const [tasks, setTasks] = useState([]);
    const {detailsShow, showDetails} = hookShowDetails();
    const {filter, handleSetFilter} = hookSetFilter();
    const [search, setSearch] = useState('');
    const [showDone, setDoneShow] = useState(true);

    useEffect(()=>{
        return ()=> setTasks(data.tasks)
    },[data])

    const handleSetSearch = (e)=>{
        setSearch(normalizeString(e.target.value))
    }
    const handleDoneChange = ()=>{
        setDoneShow(!showDone);
    }

    return (
        <div className="flex flex-wrap flex-col p-4">
        <h1 className="sm:text-2xl md:text-5xl fw-bold">Todas as tasks</h1>
        {tasks.length > 0 &&
            <>
            <FilterTask handleDoneChange={handleDoneChange} showDone={showDone} handleSetSearch={handleSetSearch} handleSetFilter={handleSetFilter} /> 
            <Tasks showDone={showDone} search={search} filter={filter} tasks={tasks}  detailsShow={detailsShow} onClick={showDetails} />
            </>
        }
        <Outlet />
        </div>
    )
}