import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { LoggedProvider } from './Contexts/LoggedContext.jsx'
import './index.css'
import { Providers } from './utils/providers.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <LoggedProvider>
        <Providers>
            <App />
        </Providers>
      </LoggedProvider>
  </React.StrictMode>,
)
