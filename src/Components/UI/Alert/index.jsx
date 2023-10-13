export default function Alert(props){

    return (
        <div className={`alert alert-${props.type ?? 'danger'} flex justify-between items-center gap-2`}>
            <div>{props.message}</div>
            <div onClick={props.onClick} className="btn btn-danger">X</div>
        </div>
    )
}