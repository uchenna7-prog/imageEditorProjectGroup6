import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {GridDisplaySizesProvider} from "./contexts/GridDisplaySizes"
import { ThemeProvider } from './contexts/ThemeContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <GridDisplaySizesProvider>
        <App />
      </GridDisplaySizesProvider>
    </ThemeProvider>
  </StrictMode>
)
