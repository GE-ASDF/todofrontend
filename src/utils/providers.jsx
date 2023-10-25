import {QueryClientProvider, QueryClient} from "@tanstack/react-query"
import {ReactQueryDevtools} from "@tanstack/react-query-devtools"

/**
 * 
 * @param {ReactNode} children - Elemento React 
 * @returns QueryClientProvider
 */
export const Providers = ({children})=>{
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools buttonPosition="bottom-left" initialIsOpen={false} />
        </QueryClientProvider>
    )
}

