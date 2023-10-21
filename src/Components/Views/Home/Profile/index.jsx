import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import aya from "../../../../api/aya";
import HTTP from "../../../../api/http";
import { useAlert } from "../../../../Contexts/AlertContext";
import { useTheme } from "../../../../Contexts/ContextsLoaders/useTheme"
import { useLogged } from "../../../../Contexts/LoggedContext";
import Input from "../../../UI/Forms/Input";


export default function Profile(props){
    const [user, setUser] = useState(false);
    const {control, handleSubmit }= useForm()
    const [csrfToken, setCsrfToken] = useState('');
    const dataUserLogged = useLogged();
    const dataUser = JSON.parse(dataUserLogged.user)
    const {handleSetAlert} = useAlert();
    const getUserLogged = async()=>{
        const getUser = new HTTP('/auth')
        const getCsrfToken = new HTTP("/csrfToken");
        const response = await getUser.http();
        const csrfTokenAwait = await getCsrfToken.http();
        if(response.error == false){
            setUser(() => response.user);
        }
        if(csrfTokenAwait.csrfToken){
            setCsrfToken(csrfTokenAwait.csrfToken)
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
    const updateData = async()=>{
        const http = new HTTP('/admin/users/update', 'POST', control._formValues);
        const response = await http.http();
    
        if(response.error == true){
            if(response.type == "fields"){
                response.errors.forEach(i =>{
                    handleSetAlert({type:'danger', message:i.msg})
                })
            }else{
                handleSetAlert({type:'danger', message:response.message})
            }
        }else{
            dataUser.name = control._formValues.name;
            dataUserLogged.setUserLogged(JSON.stringify(dataUser))
            handleSetAlert({type:'success', message:response.message})
        }
    }
    return(
        <div onClick={handleClose} className="absolute can-close left-0 top-0 z-10 w-screen h-screen bg-slate-500 bg-opacity-50 flex justify-center items-center ">
        <div className={`card ${themeCtx.theme == 'dark' ? 'dark':''} rounded px-8 py-2`}>
            <div className={`card-header text-center`}>
                <h2 className="fw-bold text-3xl">Meu perfil</h2>
            </div>
            <div className={`card-body`}>
                {user &&
                <form onSubmit={handleSubmit(updateData)} className="flex flex-col gap-2">
                    <div className="form-group flex gap-1 items-center">
                        <label htmlFor="">Nome:</label>
                        <Input defaultValue={user.name} value={user.name} name="name" label="" placeholder="Digite seu nome" rules={{required:"O nome é obrigatório"}} control={control}/>
                    </div>
                    <div className="form-group flex gap-1 items-center">
                        <label htmlFor="">Senha:</label>
                        <Input defaultValue="" type="password" name="password" label="" placeholder="Digite uma nova senha"  control={control}/>
                        {csrfToken &&
                            <Input name="_csrf" label="" type="hidden" defaultValue={`${csrfToken}`} placeholder="Digite uma nova senha" rules={{required:"A senha é obrigatória"}} control={control}/>
                        }
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