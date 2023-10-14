import { Navigate } from "react-router-dom";
import Body from "../../Components/Views/Home/Body";
import Header from "../../Components/Views/Home/Header";
import { useLogged } from "../../Contexts/LoggedContext";
import { MenuProvider } from "../../Contexts/MenuContext";

export default function Home(){
    return (
        <MenuProvider>
            <div className="h-screen w-screen overflow-hidden">
                <Header />
                <Body />
            </div>
        </MenuProvider>
    )
}