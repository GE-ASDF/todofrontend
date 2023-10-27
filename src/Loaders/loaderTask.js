import { getTask } from "../utils/api"

export const loaderTask = async({params})=>{
    const task = await getTask(params.id)
    return task;
}