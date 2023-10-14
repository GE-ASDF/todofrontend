import Input from "../Components/UI/Forms/Input";
import HTTP from "../api/http";
import Cookies from "js-cookies";
import {useNavigate} from "react-router-dom"
import {useForm} from "react-hook-form";
import { useAlert } from "../Contexts/AlertContext";
import { useLogged } from "../Contexts/LoggedContext";
import { useState } from "react";
import Loader from "../Components/UI/Loader"

const Login = ()=>{
    const [form, setForm] = useState('login');
    const {setUserLogged} = useLogged();
    const [loading, setLoading] = useState(false);
    const {handleSetAlert} = useAlert();
    const {control, handleSubmit, reset} = useForm();
    const navigate = useNavigate();
    
    const authenticate = async ()=>{
        setLoading(true);
        const http = new HTTP("/auth", 'POST', control._formValues);
        const response = await http.http();
        if(response.error){
            handleSetAlert({type:'danger', message:response.message})
            setLoading(false);
        }else{
            Cookies.setItem('token',response.token);
            setUserLogged(JSON.stringify(response.user))
            handleSetAlert({type:'success', message:response.message})
            setLoading(false);
            return navigate("/app")
        }
    }
    const cadastre = ()=>{
        console.log(control._formValues)
    }
    return(
        <>
        {loading && <Loader />}

        <div className="container-fluid p-2 flex h-screen items-center justify-center bg-danger">
        <div>

        {form == 'login' &&
            <form className="" onSubmit={handleSubmit(authenticate)}>
                <div className="justify-center items-start bg-purple-950 text-white rounded-lg px-8 py-8 flex flex-col gap-3 form-group">
                    <h1 className="text-3xl text-center">ToDo</h1>
                    <Input defaultValue="" autofocus="autofocus" placeholder="Digite seu usuário" rules={{required:"Este campo é obrigatório.", maxLength:{value:"255", message:"Este campo só suporta 255 caracteres"}}} type="text" label="Usuário" name="user" control={control} />
                    <Input defaultValue="" placeholder="Digite sua senha"  rules={{required:"Este campo é obrigatório.", maxLength:{value:"255", message:"Este campo só suporta 255 caracteres"}}} type="password" label="Senha" name="password" control={control} />
                    <div>
                        <button className="btn btn-primary">Login</button>
                    </div>
                </div>
            </form>
        }
        {form == 'cadastre' &&
            <form className="" onSubmit={handleSubmit(cadastre)}>
            <div className="justify-center items-start bg-purple-950 text-white rounded-lg px-8 py-8 flex flex-col gap-3 form-group">
                <h1 className="text-3xl text-center">ToDo</h1>
                <div className="form-group w-100">
                    <Input  defaultValue="" autofocus="autofocus" placeholder="Digite seu nome"  rules={{required:"Este campo é obrigatório.", maxLength:{value:"255", message:"Este campo só suporta 255 caracteres"}}} type="text" label="Nome" name="name" control={control} />
                </div>
                <div className="form-group flex gap-2">
                    <Input defaultValue=""  placeholder="Digite seu usuário" rules={{required:"Este campo é obrigatório.", maxLength:{value:"255", message:"Este campo só suporta 255 caracteres"}}} type="text" label="Usuário" name="user" control={control} />
                    <Input defaultValue="" placeholder="Digite sua senha"  rules={{required:"Este campo é obrigatório.", maxLength:{value:"255", message:"Este campo só suporta 255 caracteres"}}} type="password" label="Senha" name="password" control={control} />
                </div>
                <div>
                    <button className="btn btn-primary">Cadastrar</button>
                </div>
            </div>
        </form>
        }
        <div>
            {form == 'login' &&
                <p className="btn btn-sm btn-light mt-2 cursor-pointer" onClick={()=> {setForm('cadastre'); reset()}} >Cadastre-se</p>
            }
            {form == 'cadastre' &&
                <p className="btn btn-sm btn-light mt-2 cursor-pointer" onClick={()=> {setForm('login'); reset()}} >Já tenho cadastro</p>
            }
        </div>
        </div>
        
        </div>
        </>
    )
}

export default Login;