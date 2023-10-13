import "./style.css";

export default function Loader(){
    return (
        <div className="flex justify-center items-center w-screen h-screen bg-slate-950 opacity-50 container-loader">
            <span className="loader"></span>
        </div>
    )
}