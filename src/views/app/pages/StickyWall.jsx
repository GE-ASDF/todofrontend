import { useForm } from "react-hook-form";
import Input from "../../../Components/UI/Forms/Input";
import DOMPurify from "dompurify";

import { useSticky } from "../../../Contexts/StickyContext";
export const FormatText = (text)=>{
    const formattedText = text.replace(/\*(.*?)\*/g, "<b>$1</b>").replace(/\n/g, '<br/> ')
    const sanitizedData = () => ({
        __html: DOMPurify.sanitize(data)
      })
    
    return formattedText;
}
export default function StickyWall(){
    const {control, handleSubmit} = useForm();
    const {stickies} = useSticky();

    return(
        <div className="flex flex-wrap flex-col p-4">
            <h1 className="lg:text-5xl md:text-3xl text-3xl  fw-bold">Anotações</h1>
            <div className="flex gap-2 flex-wrap mt-4">
                {stickies.length > 0 && stickies.map(sticky =>{
                    return(
                        <div key={sticky.id} className="card bg-yellow-200">
                                <div className="card-header">
                                    {sticky.title}
                                </div>
                                <div dangerouslySetInnerHTML={{ __html: FormatText(sticky.body)}} className="card-body max-w-xs" />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}