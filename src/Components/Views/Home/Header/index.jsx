import PropTypes from "prop-types";
import {useMenu} from "../../../../Contexts/MenuContext"
import Menu from "../../../UI/Menu";
import {Link} from "react-router-dom"
import {useTheme} from "../../../../Contexts/ContextsLoaders/useTheme"
import {useForm} from "react-hook-form"
import Input, { Select, Option } from "../../../UI/Forms/Input";
export default function Header(props){
    const {control, handleSubmit} = useForm();
    const {showMenu, setShowMenu} = useMenu();
    const {theme, setTheme} = useTheme();
    
    const handleShowMenu = ()=>{
        setShowMenu(!showMenu)
    }
    const saveTask = ()=>{
        alert(control._formValues.priority)
    }
    const handleSetTheme = ()=>{
        const themeToSet = theme =='dark' ? 'light':'dark';
        setTheme(themeToSet);
    }
 
    return (
        <div className={`flex justify-between  text-white bg-orange-700 p-1`}>
            <div className="flex gap-2 mx-2">
                {!showMenu &&
                    <Menu onClick={handleShowMenu} />
                }
                <Link to="/app">
                    <i className="bi cursor-pointer bi-house-door"></i>
                </Link>
                {theme == 'dark' && <i onClick={handleSetTheme} className="bi cursor-pointer bi-brightness-high"></i>}
                {theme != 'dark' && <i onClick={handleSetTheme} className="bi cursor-pointer bi-moon-stars"></i>}
                
            </div>
            <div className="flex gap-2 mx-2">
                <i className="bi cursor-pointer bi-plus-lg"></i>
                <i className="bi cursor-pointer bi-bell"></i>
                <div className={`absolute ${theme == "dark" ? "dark":""} border p-2 rounded-start rounded-b-lg top-6 right-12`}>
                    <form onSubmit={handleSubmit(saveTask)} className="flex flex-col gap-2">
                        <h2>Add tarefa</h2>
                        <Input defaultValue="" label="Título" placeholder="Título da tarefa" name="title" rules={{required:"Este campo é obrigatório"}} control={control}></Input>
                        <Input defaultValue="" label="Descrição" placeholder="Descrição da tarefa" name="description" control={control} rules={{required:"Este campo é obrigatório"}}></Input>
                        <Input type="date" defaultValue="" label="Data de fim"  name="enddate" control={control} rules={{required:"Este campo é obrigatório"}}></Input>
                        <div className="flex gap-2">
                            <Input checked="checked" type="radio" className={`form-check`} rules={{required:"Escolha uma prioridade"}} value="0" label="Baixa" name="priority" control={control}></Input>
                            <Input type="radio" className={`form-check`} rules={{required:"Escolha uma prioridade"}} value="1" label="Média" name="priority" control={control}></Input>
                            <Input type="radio" className={`form-check`} rules={{required:"Escolha uma prioridade"}} value="2" label="Alta" name="priority" control={control}></Input>
                        </div>
                         <div>
                            <Select label="Categoria" name="category" control={control}>
                                <Option value="trabalho">Trabalho</Option>                                
                                <Option value="escola">Escola</Option>                                
                            </Select>
                         </div>
                        <button className="btn btn-primary">Add</button>
                    </form>
                    
                </div>
            </div>
        </div>
    )
}


Header.propTypes = {
    children: PropTypes.element
}