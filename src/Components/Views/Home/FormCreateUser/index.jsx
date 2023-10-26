import { useForm } from "react-hook-form";
import HTTP from "../../../../api/http";
import { useAlert } from "../../../../Contexts/AlertContext";
import useGetCsrfToken from "../../../../hooks/useGetCsrfToken";
import Input from "../../../UI/Forms/Input";
import { useCsrfToken } from "../../../../utils/queries";

export default function FormCreateUser({setForm}){
    const {handleSetAlert} = useAlert();
    const csrfToken = useCsrfToken();

    const {control, handleSubmit, reset} = useForm({
        name:'',
        user:'',
        password:'',
    });

    const cadastre = async ()=>{
        const http = new HTTP("/admin/users/create", 'POST', control._formValues);
        const response = await http.http();
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
            if(setForm){
                setForm('login')
            }
        }
    }

    return(
        <form onSubmit={handleSubmit(cadastre)}>
            <div className="justify-center items-start bg-purple-950 text-white rounded-lg px-8 py-8 flex flex-col gap-3 form-group">
                <h1 className="text-3xl text-center">ToDo</h1>
                <div className="form-group w-100">
                    <Input  defaultValue="" autofocus="autofocus" placeholder="Digite seu nome"  rules={{required:"Este campo é obrigatório.", maxLength:{value:"255", message:"Este campo só suporta 255 caracteres"}}} type="text" label="Nome" name="name" control={control} />
                </div>
                <div className="form-group flex gap-2">
                    <Input defaultValue=""  placeholder="Digite seu usuário" rules={{required:"Este campo é obrigatório.", maxLength:{value:"255", message:"Este campo só suporta 255 caracteres"}}} type="text" label="Usuário" name="user" control={control} />
                    <Input defaultValue="" placeholder="Digite sua senha"  rules={{required:"Este campo é obrigatório.", maxLength:{value:"255", message:"Este campo só suporta 255 caracteres"}}} type="password" label="Senha" name="password" control={control} />
                </div>
                    {!csrfToken.isLoading &&
                        <Input defaultValue={`${csrfToken.data.csrfToken}`} placeholder="Digite sua senha"  rules={{required:"Este campo é obrigatório.", maxLength:{value:"255", message:"Este campo só suporta 255 caracteres"}}} type="hidden" label="" name="_csrf" control={control} />
                    }
                <div>
                    <button className="btn btn-primary">Cadastrar</button>
                </div>
            </div>
        </form>
    )

}