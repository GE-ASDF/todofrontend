import { createContext,  useContext, useEffect, useState } from "react";
import Alert from "../Components/UI/Alert";
import PropTypes from "prop-types";

export const AlertContext = createContext();


export const AlertProvider = (props)=>{
   
    const [alerts, setAlert] = useState([])
    
     /**
      * Esta função cria um novo alert do tipo alert
     * @param {alert} alert - um objeto do tipo alert
     * @returns void
     */
    const handleSetAlert = (alert)=>{
        setAlert((prev)=> [...prev, alert])

    }

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
        <AlertContext.Provider value={{handleSetAlert, alerts}}>
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