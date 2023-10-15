export default function Tasks({tasks,done, detailsShow, onClick}){
    return (
        <>
            {tasks.length > 0 && tasks.map(task =>{
                return (
                    <div key={task.id}  className="flex flex-wrap gap-2 rounded-md cursor-pointer flex-row border p-2 mt-4">
                    <div onClick={() => onClick(task.id)} className="flex w-100 flex-col">
                        <h5 className="fw-bold text-sm">{task.title}</h5>
                        {detailsShow.show && detailsShow.id == task.id && 
                            <>
                                <span className="mx-2">Descrição: {task.description}</span>
                            </>
                        }
                    <div className="flex flex-wrap gap-2">
                    <div className="flex  items-center gap-1">
                        <i className="bi bi-calendar-event"></i>
                        <span className="text-sm">
                        {new Date(task.enddate).toLocaleDateString('pt-br')}</span>
                    </div>
                    <div className="flex  items-center gap-1">
                        <i className="bi bi-bookmark"></i>
                        <span className="text-sm">
                        {task.category_title}</span>
                    </div>
                    </div>
                    
                    </div>
                        <div className="flex flex-row justify-start items-start gap-2">
                            {task.done == 0 && <span className="btn btn-sm btn-warning" onClick={()=> done(task.id)}>{task.done == 0 && 'Pending'}</span>}
                            {task.done > 0 && <span className="btn btn-sm btn-success" onClick={()=> done(task.id)}>{task.done > 0 && 'Done'}</span>}
                            <span className="btn btn-sm btn-danger" onClick={()=> done(task.id)}>Remover</span>
                        </div>
                    </div>
                )
            })}
        </>
    )
}