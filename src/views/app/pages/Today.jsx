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
    const taskss = !data.tasks.isFetching ? data.tasks.data.filter((task)=>{
            if(convertDate( new Date(task.enddate).toLocaleDateString('pt-br')) == convertDate(new Date().toLocaleDateString('pt-br'))){
                return task;
            }
    }):[];
    const handleSetSearch = (e)=>{
        setSearch(normalizeString(e.target.value))
    }
    const handleDoneChange = ()=>{
        setDoneShow(!showDone);
    }
    return (
        <div className="flex flex-wrap flex-col p-4">
        {data.tasks.isLoading && <Loader />}
        <h1 className="sm:text-2xl md:text-5xl fw-bold">Tasks de hoje</h1>
            {taskss && taskss.length > 0 &&
            <>
                <FilterTask showDone={showDone} handleDoneChange={handleDoneChange} handleSetSearch={handleSetSearch} handleSetFilter={handleSetFilter} />
                <Tasks showDone={showDone}  search={search} filter={filter} tasks={taskss} done={done} detailsShow={detailsShow} onClick={showDetails} />
            </>
            }
        <Outlet />
        </div>
    )
}