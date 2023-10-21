import { useTheme } from "../../../../Contexts/ContextsLoaders/useTheme";

export default function FormAddSticky({handleTypingSticky, saveSticky}){
    const {theme} = useTheme();
    return(
        <div className={`absolute ${theme == "dark" ? "dark":"bg-slate-500 text-light"} border p-2 rounded-start z-1 rounded-b-lg bottom-14 right-14 mymodal`}>
            <form onSubmit={saveSticky} className="flex flex-col gap-2">
                <h2>Add anotação</h2>
                <div className="form-group">
                    <label htmlFor="">Título:</label>
                    <input onChange={handleTypingSticky} className="form-control" placeholder="Título da anotação" name="title"/>                        
                </div>
                <div className="form-group">
                    <label htmlFor="">Anotação:</label>
                    <textarea onChange={handleTypingSticky} placeholder="Digite sua anotação aqui" name="body" id=""  cols="30" rows="5" className="form-control"></textarea>
                </div>
                <button className="btn btn-primary">Add</button>
            </form>
        </div>
    )
}