import { useForm } from "react-hook-form";
import Input from "../../../Components/UI/Forms/Input";
import DOMPurify from "dompurify";

import { useSticky } from "../../../Contexts/StickyContext";
import { useState } from "react";
import { useLogged } from "../../../Contexts/LoggedContext";
import { useTheme } from "../../../Contexts/ContextsLoaders/useTheme";
import HTTP from "../../../api/http";
import { useAlert } from "../../../Contexts/AlertContext";
import FormAddSticky from "../../../Components/Views/Home/FormAddSticky";
import { useEffect } from "react";
import Stickies from "../../../Components/Views/Home/Stickies";
import { useStickies } from "../../../utils/queries";
import Loader from "../../../Components/UI/Loader";
import { useRef } from "react";
import { getStickies } from "../../../utils/api";
import { useAddStickyMutation } from "../../../utils/mutations";

export default function StickyWall(){
    const [currentPage, setCurrentPage] = useState(1);
    const data = useStickies(currentPage);
    const[showAddSticky, setShowAddSticky] = useState(false)
    const [maxPages, setMaxPages] = useState(1)
    const [paginated, setPaginated] = useState([]) 
    const [totalStickies, setTotalStickies] = useState(0)
    const containerRef = useRef(null)
    const stickies = useSticky();

    const getMoreStickies = async()=>{
        data.refetch();
        setPaginated(data.data.sticky);      
        setMaxPages(data.data.maxPages)
        setTotalStickies(data.data.totalStickies)
    }

    useEffect(()=>{
        getMoreStickies()
    },[data.data])

    useEffect(()=>{
        const container = containerRef.current;
        const handleScroll = ()=>{
            if(container.scrollTop + container.clientHeight >= container.scrollHeight - 10){
                if(maxPages >= currentPage){
                    setCurrentPage(currentPage + 1);
                }
            }
        }
        container.addEventListener("scroll", handleScroll)
        getMoreStickies();
        return ()=> container.removeEventListener("scroll", handleScroll)
    },[currentPage, data.maxPages, stickies.sticky])

    
    const handleShowAddSticky = ()=>{
        setShowAddSticky(!showAddSticky)
    }

    useEffect(()=>{
        const closeShowAddSticky = (e)=>{
            if(e.key.toLowerCase() == 'escape'){
                setShowAddSticky(false)
            }
        }
        const closeShowModalOnOutsideClick = (e)=>{
            if(e.target.classList.contains('modal-open')){
                setShowAddSticky(true);
            }else{
   
                if(showAddSticky && e.target.closest('.mymodal') == null){
                    setShowAddSticky(false)
                }
            }
        }
        document.addEventListener("keyup", closeShowAddSticky)
        window.addEventListener("click", closeShowModalOnOutsideClick)
        return ()=> {
            document.removeEventListener("keyup", closeShowAddSticky)
            window.removeEventListener("click", closeShowModalOnOutsideClick)
        }
    },[showAddSticky])

    return(
        <div ref={containerRef} className={`flex overflow-y-auto overflow-x-hidden h-100 flex-col p-4 `}>
            <h1 className="lg:text-5xl md:text-3xl text-3xl  fw-bold">Anotações ({totalStickies})</h1>
            <h2>Mostrando: {paginated.length}</h2>
            {paginated.length > 0 &&
                <Stickies stickies={paginated} />
            }
            {showAddSticky &&
                <FormAddSticky />
            }
            <div onClick={handleShowAddSticky} className="rounded-full  text-3xl cursor-pointer hover:text-purple-500  h-10 w-10 flex items-center justify-center absolute bottom-5  right-5">
                <i className="bi modal-open bi-plus-circle"></i>
            </div>
            <div className="form-group flex justify-start mt-2">
                {totalStickies > paginated.length &&
                    <button onClick={()=> setCurrentPage(currentPage + 1)} className="btn btn-secondary">Carregar mais</button>
                }
            </div>
        </div>
    )
}