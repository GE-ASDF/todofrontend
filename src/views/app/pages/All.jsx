import { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import Tasks from "../../../Components/Views/Home/Tasks";
import { normalizeString } from "../../../utils/utils";
import FilterTask from "../../../Components/UI/FilterTask";
import hookSetFilter from "../../../hooks/hookSetFilter";
import hookShowDetails from "../../../hooks/hookShowDetails";
import { useLogged } from "../../../Contexts/LoggedContext";
import Loader from "../../../Components/UI/Loader";
import {useTasks} from "../../../Contexts/TasksContext";




export default function All(){
    const {detailsShow, showDetails} = hookShowDetails();
    const {filter, handleSetFilter} = hookSetFilter();
    const [search, setSearch] = useState('');
    const [showDone, setDoneShow] = useState(true);
    const {user} = useLogged();
    const dataUser = JSON.parse(user)
    const query = useTasks(dataUser.id)

    useEffect(()=>{
        return () => query.tasks.refetch();
    },[query.task])
    
    const handleSetSearch = (e)=>{
        setSearch(normalizeString(e.target.value))
    }
    const handleDoneChange = ()=>{
        setDoneShow(!showDone);
    }

    return (
        <>
        {/* {query.isLoading && <Loader />} */}
        <div className="flex flex-wrap flex-col p-4">
        <h1 className="sm:text-2xl md:text-5xl fw-bold">Todas as tasks</h1>
        {!query.tasks.isLoading &&
            <>
                <FilterTask handleDoneChange={handleDoneChange} showDone={showDone} handleSetSearch={handleSetSearch} handleSetFilter={handleSetFilter} /> 
                <Tasks showDone={showDone} search={search} filter={filter} tasks={query.tasks.data}  detailsShow={detailsShow} onClick={showDetails} />
            </>
        }
        <Outlet />
        </div>
        </>
    )
}