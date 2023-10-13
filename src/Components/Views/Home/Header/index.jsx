export default function Header(props){
    
    return (
        <div className="flex justify-between text-white bg-orange-700 p-1">
            <div className="flex gap-2 mx-2">
                <i className="bi cursor-pointer bi-three-dots-vertical"></i>
                <i className="bi cursor-pointer bi-house-door"></i>
            </div>
            <div className="flex gap-2 mx-2">
                <i className="bi bi-plus-lg"></i>
                <i className="bi cursor-pointer bi-bell"></i>
            </div>
        </div>
    )
}

import PropTypes from "prop-types";
Header.propTypes = {
    children: PropTypes.element
}