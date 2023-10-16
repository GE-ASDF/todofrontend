import { formatText } from "../../../../utils/utils"


export default function Stickies({stickies}){
    return (
        <div className="flex gap-2 flex-wrap mt-4">
            {stickies.length > 0 && stickies.map(sticky =>{
                return(
                <div style={{minWidth:"300px", maxWidth:"300px"}} key={sticky.id} className="card bg-yellow-200">
                    <div className="card-header flex items-center justify-between">
                        {sticky.title}
                        <button className="btn btn-danger">X</button>
                    </div>
                    <div style={{maxHeight:"250px", overflowY:"auto"}} dangerouslySetInnerHTML={{ __html: formatText(sticky.body)}} className="card-body" />
                </div>
                )
            })}
        </div>
    )
}