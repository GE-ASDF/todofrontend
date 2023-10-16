import { Link, useLocation, useParams } from "react-router-dom";

export default function EditTask(){
    const data = useParams();
    const local = useLocation().pathname.split("/edittask/");
    console.log(local)
    console.log(data);
    return (
        <>
        <div className="absolute rounded-2xl w-72 h-screen top-0 right-0 p-2 bg-black">
            <div className="flex justify-end items-end">
                <Link to={`${local[0]}`} className="btn btn-danger">X</Link>
            </div>
        </div>
        </>
    )
}