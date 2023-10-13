import PropTypes from "prop-types";
import {useMenu} from "../../../../Contexts/MenuContext"
import Menu from "../../../UI/Menu";
import {Link} from "react-router-dom"
import {useTheme} from "../../../../Contexts/ThemeContext"
export default function Header(props){
    const {showMenu, setShowMenu} = useMenu();
    const {theme, setTheme} = useTheme();
    
    const handleShowMenu = ()=>{
        setShowMenu(!showMenu)
    }

    const handleSetTheme = ()=>{
        const themeToSet = theme =='dark' ? 'light':'dark';
        setTheme(themeToSet);
    }
 
    return (
        <div className={`flex justify-between  text-white bg-orange-700 p-1`}>
            <div className="flex gap-2 mx-2">
                {!showMenu &&
                    <Menu onClick={handleShowMenu} />
                }
                <Link to="/app">
                    <i className="bi cursor-pointer bi-house-door"></i>
                </Link>
                {theme == 'dark' && <i onClick={handleSetTheme} className="bi cursor-pointer bi-brightness-high"></i>}
                {theme != 'dark' && <i onClick={handleSetTheme} className="bi cursor-pointer bi-moon-stars"></i>}
                
            </div>
            <div className="flex gap-2 mx-2">
                <i className="bi cursor-pointer bi-plus-lg"></i>
                <i className="bi cursor-pointer bi-bell"></i>
            </div>
        </div>
    )
}


Header.propTypes = {
    children: PropTypes.element
}