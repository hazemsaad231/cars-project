import './i18n';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ContextProvider from './components/context/Context'





createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextProvider>
       <App />
       </ContextProvider>
  </StrictMode>,
)
