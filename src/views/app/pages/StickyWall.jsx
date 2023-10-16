import { useForm } from "react-hook-form";
import Input from "../../../Components/UI/Forms/Input";
import DOMPurify from "dompurify";

import { useSticky } from "../../../Contexts/StickyContext";
import { useState } from "react";
import { useLogged } from "../../../Contexts/LoggedContext";
import { useTheme } from "../../../Contexts/ContextsLoaders/useTheme";
import HTTP from "../../../api/http";
import { useAlert } from "../../../Contexts/AlertContext";
export const FormatText = (text)=>{
    const formattedText = text.replace(/\*(.*?)\*/g, "<b>$1</b>").replace(/\n/g, '<br/> ')
    const sanitizedData = () => ({
        __html: DOMPurify.sanitize(data)
      })
    
    return formattedText;
}
export default function StickyWall(){
    const {handleSetAlert} = useAlert();
    const {user} = useLogged();
    const[showAddSticky, setShowAddSticky] = useState(false)
    const dataUser = JSON.parse(user);
    const {theme, setTheme} = useTheme();
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
    return(
        <div className="flex flex-wrap flex-col p-4">
            <h1 className="lg:text-5xl md:text-3xl text-3xl  fw-bold">Anotações</h1>
            <div className="flex gap-2 flex-wrap mt-4">
                {data.stickies.length > 0 && data.stickies.map(sticky =>{
                    return(
                        <div key={sticky.id} className="card bg-yellow-200">
                                <div className="card-header">
                                    {sticky.title}
                                </div>
                                <div dangerouslySetInnerHTML={{ __html: FormatText(sticky.body)}} className="card-body max-w-xs" />
                        </div>
                    )
                })}
            </div>
            {showAddSticky &&
            <div className={`absolute ${theme == "dark" ? "dark":"bg-slate-500 text-light"} border p-2 rounded-start z-1 rounded-b-lg bottom-14 right-14`}>
                    <form onSubmit={saveSticky} className="flex flex-col gap-2">
                        <h2>Add anotação</h2>
                        <div className="form-group">
                            <label htmlFor="">Título:</label>
                            <input onChange={handleTypingSticky} className="form-control" placeholder="Título da anotação" name="title"/>                        
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Anotação:</label>
                            <textarea onChange={handleTypingSticky} placeholder="Digite sua anotação aqui" name="body" id=""  cols="30" rows="5" className="form-control"></textarea>
                        </div>
                        <button className="btn btn-primary">Add</button>
                    </form>
            </div>
            }
            <div onClick={handleShowAddSticky} className="rounded-full text-3xl cursor-pointer hover:text-purple-500  h-10 w-10 flex items-center justify-center absolute bottom-5  right-5">
                <i className="bi bi-plus-circle"></i>
            </div>
        </div>
    )
}