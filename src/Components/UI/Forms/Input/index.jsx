import {useController} from "react-hook-form"
import { useAlert } from "../../../../Contexts/AlertContext";
const Input = (props)=>{
    const {field, fieldState} = useController(props);
    if(props.type == "radio"){
        delete field.value
        return(
            <div className={`form-check ${fieldState.invalid ? "border border-red-700" : ""}`}>
                <label>
                <input
                    type="radio"
                    className="form-check-input"
                    value={props.value}
                    {...field}
                    />
                    {props.label ?? field.name}
                </label>
                <div>
                    {fieldState.invalid && <small>{fieldState.error.message}</small>}
                </div>
            </div>
        )
    }
    
    return (
        <div className="form-group flex flex-col">
            <label htmlFor="">{props.label ?? field.name}</label>
            <input value={props.value} autoFocus={props.autofocus} type={props.type ?? "text"} className={`form-control ${props.className} ${fieldState.invalid ? "border border-red-700":""}`} placeholder={props.placeholder} {...field} name={field.name} />
            <div>
                {fieldState.invalid && <small >{fieldState.error.message}</small>}
            </div>
        </div>
    )
}

export const Select = (props)=>{
    const {field, fieldState} = useController(props);
    return(
        <>
            <label htmlFor="">{props.label ?? field.name}</label>
            <select {...field} name={field.name} className={`form-select ${props.className}`} id="">
                {props.children}
            </select>
            <div>
                {fieldState.invalid && <p className="alert alert-danger ">{fieldState.error.message}</p>}
            </div>
        </>
    )
}

export const Option = (props)=>{
    return <option value={props.value}>{props.children}</option>
}

export default Input;