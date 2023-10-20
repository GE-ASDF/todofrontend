import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { LoggedProvider } from './Contexts/LoggedContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LoggedProvider>
      <App />
    </LoggedProvider>
  </React.StrictMode>,
)
