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

export default function StickyWall(){
    const {handleSetAlert} = useAlert();
    const {user} = useLogged();
    const[showAddSticky, setShowAddSticky] = useState(false)
    const dataUser = JSON.parse(user);

    const [sticky, setSticky] = useState({
        iduser: dataUser.id,
        title:'',
        body:'',
    })

    const data = useSticky();
    const handleTypingSticky = (e)=>{
        if(e.target.value.length <= 1024){
            setSticky({...sticky, [e.target.name]:e.target.value.trim()})
        }else{
            setSticky({...sticky, [e.target.name]:''})
            e.target.value = ''
            handleSetAlert({type:"danger", message:"O campo só pode ter 1024 caracteres."})
            return;
        }
    }
    const saveSticky = async (e)=>{
        e.preventDefault();
   
        if(!sticky.title || !sticky.body){
            handleSetAlert({type:'danger', message:`O campo de título e anotação não podem estar vazios.`})
            return;
        }
        const http = new HTTP('/admin/sticky/create', 'POST', sticky);
        const response = await http.http();
        if(response.error){
            handleSetAlert({type:'danger', message:`Não foi possível inserir a anotação. Verifique os dados e tente novamente.`})
            return;
        }else if(response.error == false){
            handleSetAlert({type:'success', message:response.message})
            data.setSticky(true);
            return;
        }
    }
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
        <div className="flex flex-wrap flex-col p-4">
            <h1 className="lg:text-5xl md:text-3xl text-3xl  fw-bold">Anotações</h1>
            <Stickies stickies={data.stickies} />
            {showAddSticky &&
                <FormAddSticky handleTypingSticky={handleTypingSticky} saveSticky={saveSticky} />
            }
            <div onClick={handleShowAddSticky} className="rounded-full  text-3xl cursor-pointer hover:text-purple-500  h-10 w-10 flex items-center justify-center absolute bottom-5  right-5">
                <i className="bi modal-open bi-plus-circle"></i>
            </div>
        </div>
    )
}