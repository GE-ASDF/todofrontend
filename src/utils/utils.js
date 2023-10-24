export const dateISOString = ()=>{
    const date = new Date();
    const brazilian = new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString();
    return brazilian;
}

export const getDate = ()=>{
    return new Intl.DateTimeFormat('pt-br', {timeZone:"America/Sao_Paulo"}).format(new Date).split("/").reverse().join("-");
}

export const convertDate = (date)=>{
    return date.split("/").reverse().join("-");
}

export const normalizeString = (string)=>{
    return string.normalize('NFD').toLowerCase();
}

export const createTasksMetadata = (tasks)=>{
    
}
export const createMonths = (options)=>{
    return [...Array(12).keys()].map((i)=>{
        return {indice: i, month: new Date(new Date().getFullYear(), i).toLocaleDateString('pt-br', options)}
    })
}
export function getYears(tasks = []){
    const oldYears = tasks.map((task)=>{
        return new Date(task.enddate).toLocaleDateString('pt-br', {year:"numeric"})
    })
    const newYears = oldYears.filter( (year,index) =>{
        if(oldYears.indexOf(year) === index){
            return year;
        }
    })
    return newYears;
}

export const formatText = (text)=>{
    const formattedText = text.replace(/\*(.*?)\*/g, "<b>$1</b>").replace(/_(.*?)_/g, "<i>$1</i>").replace(/\n/g, '<br/> ')
    // const sanitizedData = () => ({
    //     __html: DOMPurify.sanitize(data)
    //   })
    return formattedText; 
}