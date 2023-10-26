import { useEffect, useState } from "react"
import { Navigate, Outlet } from "react-router-dom"
import Tasks from "../../../Components/Views/Home/Tasks";
import { normalizeString } from "../../../utils/utils";
import FilterTask from "../../../Components/UI/FilterTask";
import hookSetFilter from "../../../hooks/hookSetFilter";
import hookShowDetails from "../../../hooks/hookShowDetails";
import { useLogged } from "../../../Contexts/LoggedContext";
import Loader from "../../../Components/UI/Loader";
import {useTasks} from "../../../Contexts/TasksContext";
import { removeCookies } from "../../../utils/utils";

export default function All(){
    const {detailsShow, showDetails} = hookShowDetails();
    const {filter, handleSetFilter} = hookSetFilter();
    const [search, setSearch] = useState('');
    const {setUserLogged} = useLogged();
    const [showDone, setDoneShow] = useState(true);    
    const query = useTasks()
    
    useEffect(()=>{
        return () => query.tasks.refetch();
    },[query.task])
    
    const handleSetSearch = (e)=>{
        setSearch(normalizeString(e.target.value))
    }
    const handleDoneChange = ()=>{
        setDoneShow(!showDone);
    }
    if(!query.tasks.isLoading){
        if(query.tasks.data.error && query.tasks.data.type == 'not logged'){
            setUserLogged(null)
            removeCookies();
            return <Navigate to="/" />
        }
    }
    return (
        <>
        {query.tasks.isLoading && <Loader />}
        <div className="flex flex-wrap flex-col p-4">
        <h1 className="sm:text-2xl md:text-5xl fw-bold">Todas as tasks</h1>
        {!query.tasks.isLoading && !query.tasks.data.error && query.tasks?.data &&
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