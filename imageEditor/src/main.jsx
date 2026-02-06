import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {GridDisplayTypesProvider} from "./contexts/GridDisplayTypes"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GridDisplayTypesProvider>
      <App />
    </GridDisplayTypesProvider>
  </StrictMode>
)
