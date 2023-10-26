import { Navigate } from "react-router-dom";
import Body from "../../Components/Views/Home/Body";
import Header from "../../Components/Views/Home/Header";
import { MenuProvider } from "../../Contexts/MenuContext";
import { StickyProvider } from "../../Contexts/StickyContext";
import { TasksProvider } from "../../Contexts/TasksContext";
import Cookies from "js-cookies";
import { removeCookies } from "../../utils/utils";
import { useLogoutMutation, useUserLoggedMutation } from "../../utils/mutations";
import { useUser } from "../../utils/queries";
import { useEffect } from "react";

export default function Home(){
    const token = Cookies.getItem("token");
    const logoutMutation = useLogoutMutation();
    const user = useUser();
    
    if(!token){
        removeCookies();
        logoutMutation.mutate()
        return <Navigate to="/" />
    }

    return (
        <>
        {!user.isLoading && user.data && user.data.error == false &&
            <StickyProvider>
                <TasksProvider>
                    <MenuProvider>
                        <div className="h-screen w-screen overflow-hidden">
                            <Header />
                            <Body />
                        </div>
                    </MenuProvider>
                </TasksProvider>
            </StickyProvider>
        }
        {!user.isLoading && user.data && user.data.error == true &&
            <Navigate to="/" />
        }
        </>
        
        )
}