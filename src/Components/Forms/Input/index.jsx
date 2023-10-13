import {useController} from "react-hook-form"
const Input = (props)=>{
    const {field, fieldState} = useController(props);
    return (
        <div className="form-group flex flex-col">
            <label htmlFor="">{props.label ?? field.name}</label>
            <input autoFocus={props.autofocus} type={props.type ?? "text"} className={`form-control ${props.className} ${fieldState.invalid ? "border border-red-700":""}`} placeholder={props.placeholder} {...field} name={field.name} />
            <div>
                {fieldState.invalid && <p className="alert alert-danger ">{fieldState.error.message}</p>}
            </div>
        </div>
    )
}

export default Input;