import { useState } from "react";

export default function hookShowDetails(){
    const [detailsShow, setDetails] = useState([]);
    const showDetails = (id)=>{
        if(detailsShow.includes(id)){
            setDetails(detailsShow.filter(i => i != id))
        }else{
            setDetails([...detailsShow, id])
        }
    }
    return {detailsShow, showDetails};
}