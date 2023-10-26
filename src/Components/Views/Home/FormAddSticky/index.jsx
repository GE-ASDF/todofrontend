import { useState } from "react";
import { useAlert } from "../../../../Contexts/AlertContext";
import { useTheme } from "../../../../Contexts/ContextsLoaders/useTheme";
import { useSticky } from "../../../../Contexts/StickyContext";
import { useAddStickyMutation } from "../../../../utils/mutations";
import { useLogged } from "../../../../Contexts/LoggedContext";

export default function FormAddSticky(){
    const {theme} = useTheme();
    const addStickyMutation = useAddStickyMutation();
    const stickies = useSticky();
    const {user} = useLogged();
    const {handleSetAlert} = useAlert();
    const dataUser = JSON.parse(user);

    const [sticky, setSticky] = useState({
        iduser: dataUser.id,
        title:'',
        body:'',
    })
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
        addStickyMutation.mutate(sticky,{onSuccess:(response)=>{
            if(response.error){
                handleSetAlert({type:'danger', message:`Não foi possível inserir a anotação. Verifique os dados e tente novamente.`})
                return;
            }else if(response.error == false){
                handleSetAlert({type:'success', message:response.message})
                stickies.setSticky(true);
                return;
            }
        }})        
    }

    return(
        <div className={`absolute ${theme == "dark" ? "dark":"bg-slate-500 text-light"} border p-2 rounded-start z-1 rounded-b-lg bottom-14 right-14 mymodal`}>
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
                <button disabled={`${addStickyMutation.status == 'pending' ? "disabled":""}`} className="btn btn-primary">Add</button>
            </form>
        </div>
    )
}