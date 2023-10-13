import { createContext, useContext, useEffect, useState } from "react";
import Alert from "../Components/Alert";

export const AlertContext = createContext();

export const AlertProvider = (props)=>{
    const [alerts, setAlert] = useState([])
    
    const closeAlert = (key)=>{
        const newAlerts = alerts.filter((alert, id) => id != key)        
        setAlert(newAlerts);
    }

    useEffect(()=>{
        const id = setTimeout(() => {
            setAlert([])
        }, 7000);
        return ()=> clearTimeout(id);
    },[alerts])

    return (
        <AlertContext.Provider value={{setAlert, alerts}}>
            {alerts.length > 0 && 
                <div className="alert-container">
                    {alerts.map((alert, key)=>{
                        return (
                            <Alert key={key} onClick={()=> closeAlert(key)} type={alert.type} message={alert.message}  />
                        )
                    })}
                </div>
            } 
            {props.children}
        </AlertContext.Provider>
    )
}

export const useAlert = () => useContext(AlertContext)