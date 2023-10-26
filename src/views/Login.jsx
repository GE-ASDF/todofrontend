import Input from "../Components/UI/Forms/Input";
import Cookies from "js-cookies";
import {useNavigate} from "react-router-dom"
import {useForm} from "react-hook-form";
import { useAlert } from "../Contexts/AlertContext";
import { useLogged } from "../Contexts/LoggedContext";
import { useState } from "react";
import Loader from "../Components/UI/Loader"
import FormCreateUser from "../Components/Views/Home/FormCreateUser";
import {authenticate as auth, getUser} from "../utils/api"
import { useAuthenticateMutation, useUserLoggedMutation } from "../utils/mutations";
import { useCsrfToken } from "../utils/queries";

const Login = ()=>{
    const [form, setForm] = useState('login');
    const authenticateMutation = useAuthenticateMutation();
    const {setUserLogged} = useLogged();
    const {handleSetAlert} = useAlert();
    const csrfToken = useCsrfToken();
    const navigate = useNavigate();
    const {control, handleSubmit, reset, setValue} = useForm();
    const userLoggedMutation = useUserLoggedMutation();
    const authenticate =()=>{ 
        authenticateMutation.mutate(control._formValues, {
            onSuccess:(response)=>{
                if(response.error){
                    handleSetAlert({type:'danger', message:response.message})
                }else{
                    Cookies.setItem("token", response.user.token)
                    userLoggedMutation.mutate('', {
                        onSuccess:(verifiyng)=>{
                            if(verifiyng.error == false){
                                setUserLogged(JSON.stringify(response.user))
                                return navigate("/app/dashboard")
                            }else{
                                handleSetAlert({type:'danger', message:verifiyng.message})
                            }
                        }
                    })
                }
            },
            onError:()=>{
                handleSetAlert({type:"danger", message:"Ocorreu um erro"})
            }
        })
    }
    
    return(
        <>
        {authenticateMutation.status == 'pending' && <Loader />}

        <div className="container-fluid p-2 flex h-screen items-center justify-center bg-danger">
        <div>

        {form == 'login' &&
            <form className="" onSubmit={handleSubmit(authenticate)}>
                <div className="justify-center items-start bg-purple-950 text-white rounded-lg px-8 py-8 flex flex-col gap-3 form-group">
                    <h1 className="text-3xl text-center">ToDo</h1>
                    <Input defaultValue="" autofocus="autofocus" placeholder="Digite seu usuário" rules={{required:"Este campo é obrigatório.", maxLength:{value:"255", message:"Este campo só suporta 255 caracteres"}}} type="text" label="Usuário" name="user" control={control} />
                    <Input defaultValue="" placeholder="Digite sua senha"  rules={{required:"Este campo é obrigatório.", maxLength:{value:"255", message:"Este campo só suporta 255 caracteres"}}} type="password" label="Senha" name="password" control={control} />
                    <Input type="hidden" value="" defaultValue="" label="" name="_csrf" control={control}/>
                    <div>
                        <button onClick={()=> setValue('_csrf', csrfToken.data.csrfToken)} disabled={`${authenticateMutation.status == 'pending' ? 'disabled':''}`} className="btn btn-primary">Login</button>
                    </div>
                </div>
            </form>
        }
        {form == 'cadastre' &&
            <FormCreateUser setForm={setForm} />
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