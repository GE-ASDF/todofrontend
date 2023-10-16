import { useState } from "react";

export default function hookSetFilter(){
    const [filter, setFilter] = useState(-1)
    const handleSetFilter = (e)=>{
        setFilter(e.target.value.trim())
    }
    return {filter, handleSetFilter};
}