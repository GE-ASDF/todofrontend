export default function Menu(props){
    return (
        <i onClick={props.onClick} className={`bi cursor-pointer cursor-pointr ${props.className}  bi-list`}></i>
    )
}