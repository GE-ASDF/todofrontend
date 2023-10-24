import Input from "../Components/UI/Forms/Input";
import HTTP from "../api/http";
import Cookies from "js-cookies";
import {useNavigate} from "react-router-dom"
import {useForm} from "react-hook-form";
import { useAlert } from "../Contexts/AlertContext";
import { useLogged } from "../Contexts/LoggedContext";
import { useState } from "react";
import Loader from "../Components/UI/Loader"
import FormCreateUser from "../Components/Views/Home/FormCreateUser";
import useGetCsrfToken from "../hooks/useGetCsrfToken";
import { useUser } from "../Contexts/UserContext";


const Login = ()=>{
    const [form, setForm] = useState('login');

    const {setUserLogged} = useLogged();
    const [loading, setLoading] = useState(false);
    const {handleSetAlert} = useAlert();
    const navigate = useNavigate();
    const {_csrfToken} = useGetCsrfToken();

    const {control, handleSubmit, reset} = useForm({
        user:'',
        password:'',
    });

    
    console.log(_csrfToken)
    const authenticate = async()=>{ 
        setLoading(true);
        const http = new HTTP("/auth", 'POST', control._formValues);
        const response = await http.http();
        if(response.error){
            handleSetAlert({type:'danger', message:response.message})
            setLoading(false);
        }else{
            Cookies.setItem('token',response.token);
    
            const httpNew = new HTTP('/auth');
            const verifiyng = await httpNew.http();

            if(verifiyng.error == false){
                setUserLogged(JSON.stringify(response.user))
            }else{
                handleSetAlert({type:'danger', message:response.message})
            }

            setLoading(false);
            return navigate("/app/dashboard")
        }
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
                    {_csrfToken &&
                    <Input type="hidden" value={`${_csrfToken}`} defaultValue={`${_csrfToken}`} label="" name="_csrf" control={control}/>
                    }
                    <div>
                        <button className="btn btn-primary">Login</button>
                    </div>
                </div>
            </form>
        }
        {form == 'cadastre' &&
            <FormCreateUser setForm={setForm} setLoading={setLoading} />
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