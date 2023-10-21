import { useEffect } from "react"

export default function ConfirmationScreen({setShowConfirmationScreen, showConfirmationScreen,id, onClick}){

    useEffect(()=>{
        const closeModal = (e)=>{
            if(e.key.toLowerCase() == 'escape'){
                setShowConfirmationScreen(false);
            }
        }
        document.addEventListener("keyup", closeModal);
        return ()=> document.removeEventListener('keyup', closeModal);
    },[showConfirmationScreen, id])

    return(
        <div className={`bg-opacity-50 z-10 flex items-center justify-center flex-col bg-black left-0 top-0 p-2 rounded absolute w-100 h-100`}>
            <div className="p-2 rounded flex  flex-col justify-between h-40 bg-light">
                <div className="flex justify-center items-center">
                    <i className="bi text-red-800 text-5xl bi-exclamation-triangle"></i>
                    <div className="text-black">
                        <h2 className="fw-bold">Deseja apagar o registro?</h2>
                        <small>Esta ação irá apagar o registro do nosso banco de dados permanentemente.</small>
                    </div>
                </div>
                <div className="self-end gap-1 flex">
                    <button onClick={()=> setShowConfirmationScreen(false)} className="btn btn-light border">Cancelar</button>
                    <button onClick={()=> onClick(id)} className="btn btn-danger border">Apagar</button>
                </div>
            </div>
        </div>
    )
}