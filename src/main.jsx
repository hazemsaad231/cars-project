import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ContextProvider from './components/context/Context'
import './i18n'; // عشان يحمل التهيئة قبل ما React يبدأ





createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextProvider>
       <App />
       </ContextProvider>
  </StrictMode>,
)
