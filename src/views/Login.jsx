import { useState } from "react";
import Input from "../Components/Forms/Input";
import HTTP from "../api/http";
import Cookies from "js-cookies";
import {useNavigate, Navigate} from "react-router-dom"
import {useForm} from "react-hook-form";
import { useAlert } from "../Contexts/AlertContext";
import { useLogged } from "../Contexts/LoggedContext";
const Login = ()=>{
    const {setUserLogged} = useLogged();

    const {alerts, setAlert} = useAlert();
    const {control, handleSubmit} = useForm();
    const navigate = useNavigate();
    const authenticate = async ()=>{
        const http = new HTTP("/auth", 'POST', control._formValues);
        const response = await http.http();
 
        if(response.error){
            setAlert([...alerts, {type:'danger', message:response.message}])
        }else{
            Cookies.setItem('token',response.token);
            setUserLogged(JSON.stringify(response.user))
            setAlert([...alerts, {type:'success', message:response.message}])
            return navigate("/app")
        }
    }

    return(
        <div className="container-fluid p-2 flex h-screen items-center justify-center bg-danger">
            <form className="" onSubmit={handleSubmit(authenticate)}>
                <div className="justify-center items-start bg-purple-950 text-white rounded-lg px-8 py-8 flex flex-col gap-3 form-group">
                    <h1 className="text-3xl text-center">ToDo</h1>
                    <Input defaultValue="" autofocus="autofocus" placeholder="Digite seu usuário" rules={{required:"Este campo é obrigatório."}} type="text" label="Usuário" name="user" control={control} />
                    <Input defaultValue="" placeholder="Digite sua senha"  rules={{required:"Este campo é obrigatório."}} type="password" label="Senha" name="password" control={control} />
                    <div>
                        <button className="btn btn-primary">Login</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Login;