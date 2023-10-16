export default function Pagination({maxPages, page, itemsPerPage, setPage}){
    const startPage = Math.max(1, page  - 5);
    const endPage = Math.min(maxPages, startPage + itemsPerPage - 1);   
    return (
        <div className="form-group mt-2 mb-2 gap-1 flex">
            <button onClick={()=>setPage(1)} className="btn btn-primary">Início</button>
            {[...Array(maxPages).keys()].slice(startPage - 1, endPage).map((i) =>{
                    return (
                        <button className="btn btn-primary" onClick={()=>setPage(i + 1)}>{i + 1}</button>
                    )
            })}
            <button onClick={()=> setPage(maxPages)} className="btn btn-primary">Fim</button>
        </div>
    )
}