import { useQuery } from "@tanstack/react-query";
import { dashboard, getCategories, getCsrfToken, getStickies, getTasks, getUser } from "./api";

export const useTasks = (id)=> useQuery({queryKey:["tasks"], queryFn: async()=> await getTasks(id)})

export const useUser = ()=> useQuery({queryKey:['user'], queryFn: async()=> await getUser()})

export const useStickies = (page = 0)=> useQuery({queryKey:['stickies'], queryFn: async()=> await getStickies(page)})

export const useDashboard = ()=> useQuery({queryKey:['dashboard'], queryFn: dashboard})

export const useCategories =()=> useQuery({queryKey:['categories'], queryFn:getCategories})

export const useCsrfToken = ()=> useQuery({queryKey:['csrfToken'], queryFn:getCsrfToken})

