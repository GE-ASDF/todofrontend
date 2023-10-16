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