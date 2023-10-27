import { useForm } from "react-hook-form";
import HTTP from "../../../../api/http";
import { useAlert } from "../../../../Contexts/AlertContext";
import useGetCsrfToken from "../../../../hooks/useGetCsrfToken";
import Input from "../../../UI/Forms/Input";
import { useCsrfToken } from "../../../../utils/queries";
import { z } from "zod";
import {zodResolver} from "@hookform/resolvers/zod"
import { useCreateUserMutation } from "../../../../utils/mutations";
import Loader from "../../../UI/Loader";

const formCreateUser = z.object({
    name: z.string().min(2, 'Mínimo 2 caracteres').max(255, 'Máximo 255 caracteres'),
    user: z.string().min(2, 'Mínimo 2 caracteres').max(255, 'Máximo 255 caracteres').refine((user)=>/^^[a-zA-z][0-9]*$/g.test(user), 'O usuário deve iniciar com uma letra e o restante em números'),
    password: z.string().min(6, 'Mínimo 6 caracteres').refine((pass)=> /[a-zA-Z]/.test(pass), 'A senha deve ter no mínimo 1 letra'),
});


export default function FormCreateUser({setForm}){
    const {register,reset, getValues, handleSubmit, formState: {errors}} = useForm({
        resolver: zodResolver(formCreateUser)
    });
    const useCreateUser = useCreateUserMutation();
    const {handleSetAlert} = useAlert();
    const csrfToken = useCsrfToken();

    const cadastre = ()=>{
        useCreateUser.mutate(getValues(),{
            onSuccess:(response)=>{
                if(response.error){
                    if(response.type == "fields"){
                        response.errors.forEach((erro)=>{
                            handleSetAlert({type:'danger', message:erro.msg})
                        })
                        
                        setLoading(false);
                    }else{
                        handleSetAlert({type:'danger', message:response.message})
                        setLoading(false);
                    }
                }else if(response.error == false){
                    handleSetAlert({type:'success', message:response.message})
                    reset();
                    // if(setForm){
                    //     setForm('login')
                    // }
                }
            }
        })        
    }

    return(
        <form onSubmit={handleSubmit(cadastre)}>
            {useCreateUser.status == 'pending' && <Loader />}
            <div className="justify-center items-start bg-purple-950 text-white rounded-lg px-8 py-8 flex flex-col gap-3 form-group">
                <h1 className="text-3xl text-center">ToDo</h1>
                <div className="form-group w-100">
                    <input defaultValue="" className="form-control" autofocus="autofocus" placeholder="Digite seu nome"  type="text" label="Nome" name="name" {...register('name')} />
                    {errors.name &&
                        <small className="rounded-sm bg-red-500 p-1 text-white">{errors.name.message}</small>
                    }
                </div>
                <div className="form-group flex gap-2">
                    <div className="form-group">
                        <input defaultValue="" className="form-control"  placeholder="Digite seu usuário" type="text" label="Usuário" name="user" {...register('user')} />
                        {errors.user &&
                            <small className="rounded-sm bg-red-500 p-1 text-white">{errors.user.message}</small>
                        }
                    </div>
                    <div className="form-group">
                        <input defaultValue="" className="form-control" placeholder="Digite sua senha"  type="password" label="Senha" name="password" {...register('password')} />
                        {errors.password &&
                            <small className="rounded-sm bg-red-500 p-1 text-white">{errors.password.message}</small>
                        }
                    </div>
                </div>
                    {!csrfToken.isLoading &&
                        <input defaultValue={`${csrfToken.data.csrfToken}`} value={`${csrfToken.data.csrfToken}`} className="form-control" type="hidden" label="" name="_csrf" {...register('_csrf')} />
                    }
                <div>
                    <button disabled={`${useCreateUser.status == 'pending' ? 'disabled':''}`} className="btn btn-primary">{`${useCreateUser.status == 'pending' ? 'Cadastrando...':'Cadastrar'}`}</button>
                </div>
            </div>
        </form>
    )

}