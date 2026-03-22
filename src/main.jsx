import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './styles/global.css'
import "./services/interceptors";

import { AuthProvider } from "./context/AuthContext";

<AuthProvider>
  <App />
</AuthProvider>

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
