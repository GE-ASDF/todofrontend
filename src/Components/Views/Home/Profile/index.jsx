import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import aya from "../../../../api/aya";
import { useTheme } from "../../../../Contexts/ContextsLoaders/useTheme"
import Input from "../../../UI/Forms/Input";


export default function Profile(props){
    const [user, setUser] = useState(false);
    const {control, handleSubmit }= useForm()

    const getUserLogged = async()=>{
        const response = await aya.get("/auth");
        if(response.data.error == false){
            setUser(response.data.user);
        }
    }
    useEffect(()=>{
        getUserLogged()
    },[])
    const themeCtx = useTheme();
    const handleClose = (e)=>{
        const classes = Array.from(e.target.classList);
        if(classes.includes('can-close')){
            props.setShowProfile(false)
        }
    }
    useEffect(()=>{
        const closeProfile = (e)=>{
            if(e.key.toLowerCase() == 'escape'){
                props.setShowProfile(false);
            }

        }
        document.addEventListener("keyup", closeProfile);
        return () => document.removeEventListener('keyup', closeProfile)
    },[])
    return(
        <div onClick={handleClose} className="absolute can-close left-0 top-0 z-10 w-screen h-screen bg-slate-500 bg-opacity-50 flex justify-center items-center ">
        <div className={`card ${themeCtx.theme == 'dark' ? 'dark':''} rounded px-8 py-2`}>
            <div className={`card-header text-center`}>
                <h2>Meu perfil</h2>
            </div>
            <div className={`card-body`}>
                {user &&
                <form className="flex flex-col gap-2">
                    <div className="form-group flex gap-1 items-center">
                        <label htmlFor="">Nome:</label>
                        <Input defaultValue={user.name} value={user.name} name="name" label="" placeholder="Digite seu nome" rules={{required:"O nome é obrigatório"}} control={control}/>
                    </div>
                    <div className="form-group flex gap-1 items-center">
                        <label htmlFor="">Senha:</label>
                        <Input name="password" label="" placeholder="Digite uma nova senha" rules={{required:"A senha é obrigatória"}} control={control}/>
                    </div>
                    <div className="flex justify-end gap-1">
                        <button onClick={handleClose} type="button" className="btn can-close btn-secondary">Fechar</button>
                        <button className="btn btn-primary self-end">Atualizar</button>
                    </div>
                </form>
                }
            </div>            
        </div>
        </div>
    )
}