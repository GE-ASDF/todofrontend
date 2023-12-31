import { useMutation } from "@tanstack/react-query";
import { addTask, addSticky, authenticate, logout, getUser, createUser, updateTask } from "./api";

export const useAddTaskMutation = ()=>{
    const mutation = useMutation({
        mutationFn:addTask
    })
    return mutation;
}

export const useAddStickyMutation = ()=>{
    const mutation = useMutation({
        mutationFn:addSticky
    })    
    return mutation;
}

export const useAuthenticateMutation = ()=>{
    const mutation = useMutation({
        mutationFn:authenticate,
    })
    return mutation;
}

export const useLogoutMutation = ()=>{
    const mutation = useMutation({
        mutationFn:logout
    })
    return mutation;
}

export const useUserLoggedMutation = ()=>{
    const mutation = useMutation({
        mutationFn:getUser
    })
    return mutation;
}

export const useCreateUserMutation = ()=>{
    const mutation = useMutation({
        mutationFn:createUser
    })
    return mutation;
}

export const useUpdateTaskMutation = ()=>{
    const mutation = useMutation({
        mutationFn:updateTask,
    })
    return mutation;
}