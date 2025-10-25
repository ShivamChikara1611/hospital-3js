import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import AppContextProvider from './context/AppContext.jsx'
import LanguageContextProvider from './context/LanguageContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <LanguageContextProvider>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </LanguageContextProvider>
  </BrowserRouter>,
)
