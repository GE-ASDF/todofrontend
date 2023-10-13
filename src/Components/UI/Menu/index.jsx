import "./style.css";
export default function Menu(props){
    return (
        <i onClick={props.onClick} className={`bi animationMenu cursor-pointer cursor-pointr ${props.className}  bi-list`}></i>
    )
}