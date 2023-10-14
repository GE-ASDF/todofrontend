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
    const [form, setForm] = useState(0);
    const {setUserLogged} = useLogged();
    const [loading, setLoading] = useState(false);
    const {handleSetAlert} = useAlert();
    const {control, handleSubmit} = useForm();
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

    return(
        <>
        {loading && <Loader />}

        <div className="container-fluid p-2 flex h-screen items-center justify-center bg-danger">
        <div>

        {form == 0 &&
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
        {form == 1 &&
            <form className="" onSubmit={handleSubmit(authenticate)}>
            <div className="justify-center items-start bg-purple-950 text-white rounded-lg px-8 py-8 flex flex-col gap-3 form-group">
                <h1 className="text-3xl text-center">ToDo</h1>
                <div className="form-group w-100">
                    <Input  defaultValue="" placeholder="Digite seu nome"  rules={{required:"Este campo é obrigatório.", maxLength:{value:"255", message:"Este campo só suporta 255 caracteres"}}} type="password" label="Nome" name="name" control={control} />
                </div>
                <div className="form-group flex gap-2">
                    <Input defaultValue="" autofocus="autofocus" placeholder="Digite seu usuário" rules={{required:"Este campo é obrigatório.", maxLength:{value:"255", message:"Este campo só suporta 255 caracteres"}}} type="text" label="Usuário" name="user" control={control} />
                    <Input defaultValue="" placeholder="Digite sua senha"  rules={{required:"Este campo é obrigatório.", maxLength:{value:"255", message:"Este campo só suporta 255 caracteres"}}} type="password" label="Senha" name="password" control={control} />
                </div>
                <div>
                    <button className="btn btn-primary">Cadastrar</button>
                </div>
            </div>
        </form>
        }
        <div>
            {form == 0 &&
                <p className="btn btn-sm btn-light mt-2 cursor-pointer" onClick={()=> setForm(form + 1)} >Cadastre-se</p>
            }
            {form == 1 &&
                <p className="btn btn-sm btn-light mt-2 cursor-pointer" onClick={()=> setForm(form - 1)} >Já tenho cadastro</p>
            }
        </div>
        </div>
        
        </div>
        </>
    )
}

export default Login;