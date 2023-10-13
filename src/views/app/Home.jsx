import Body from "../../Components/Views/Home/Body";
import Header from "../../Components/Views/Home/Header";

export default function Home(){
    return (
        <div className="h-screen w-screen overflow-hidden">
            <Header />
            <Body />
        </div>
    )
}