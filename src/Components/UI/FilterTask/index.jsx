export default function FilterTask(props){
    return (
        <>
        <div className="form-group flex gap-2 mt-3">
            <div className="form-group">
            <span className="flex items-center justify-start">
                Filtrar: 
            </span>
            <select onChange={props.handleSetFilter} name="filtro" id="filtro" className="form-select">
                <option value="-1">Todas</option>
                <option value="0">Baixa</option>
                <option value="1">Média</option>
                <option value="2">Alta</option>
            </select>
            </div>
            <div className="flex flex-col">
                <label htmlFor="pesquisa" className="fw-bold">Pesquisa</label>
                <input autoFocus={true} onChange={props.handleSetSearch} type="text" className="form-control" placeholder="Pesquisar uma tarefa" />
            </div>
        </div>
        <div className="flex gap-2">
                <div className="form-group flex gap-1 items-center">
                    <label htmlFor="concluidas">Concluídas</label>
                    <input onChange={props.handleDoneChange} checked={`${props.showDone ? 'checked':''}`} type="checkbox" id="concluidas" className="form-check-input" />
                </div>
            </div>
        </>
    )
}