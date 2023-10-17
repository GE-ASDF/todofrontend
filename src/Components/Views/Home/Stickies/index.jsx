import { useEffect, useState } from "react";
import { useSticky } from "../../../../Contexts/StickyContext";
import { formatText } from "../../../../utils/utils"
import ConfirmationScreen from "../../../UI/ConfirmationScreen"
import HTTP from "../../../../api/http";
import { useAlert } from "../../../../Contexts/AlertContext";


export default function Stickies({stickies}){
    const [showConfirmationScreen, setShowConfirmationScreen] = useState(false);
    const [stickyId, setStickyId] = useState('');
    const {setSticky} = useSticky();
    const {handleSetAlert} = useAlert();
    const handleShowConfirmationScreen = (id)=>{
        setStickyId(id);
        setShowConfirmationScreen(!showConfirmationScreen)
    }
    const removeSticky = async ()=>{
        const http = new HTTP('/admin/sticky/delete/'+stickyId);
        const response = await http.http();
        if(response.error){
            handleSetAlert({type:"danger", message:response.message})
        }else{
            setShowConfirmationScreen(false);
            setStickyId('');
            handleSetAlert({type:"success", message:response.message})
            setSticky(true);
        }
    }
    useEffect(()=>{
        const closeConfirmationScreen = (e)=>{
            if(e.key.toLowerCase() == 'escape'){
                setShowConfirmationScreen(false);
                setSticky('')   
            }
        }
        document.addEventListener("keyup", closeConfirmationScreen)
        return ()=> removeEventListener("keyup", closeConfirmationScreen);
    },[showConfirmationScreen, stickyId])

    return (
        <div className="flex gap-2 flex-wrap mt-4">
            {showConfirmationScreen &&
              <ConfirmationScreen setShowConfirmationScreen={handleShowConfirmationScreen} id={stickyId} onClick={removeSticky} />
            }

            {stickies.length > 0 && stickies.map(sticky =>{
                return(
                <div style={{minWidth:"300px", maxWidth:"300px"}} key={sticky.id} className="card bg-yellow-200">
                    <div className="card-header flex items-center justify-between">
                        {sticky.title}
                        <button onClick={()=> handleShowConfirmationScreen(sticky.id)} className="btn btn-danger">X</button>
                    </div>
                    <div style={{maxHeight:"250px", overflowY:"auto"}} dangerouslySetInnerHTML={{ __html: formatText(sticky.body)}} className="card-body" />
                </div>
                )
            })}
        </div>
    )
}