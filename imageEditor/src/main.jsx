import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {GridDisplaySizesProvider} from "./contexts/GridDisplaySizes"
import { ThemeProvider } from './contexts/ThemeContext.jsx'
import { SidebarProvider } from './contexts/SidebarContext';
import {BrowserRouter} from "react-router-dom";
import { ImageProvider } from './contexts/ImageContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <GridDisplaySizesProvider>
          <SidebarProvider>
            <ImageProvider>
              <App />
            </ImageProvider>
          </SidebarProvider>
        </GridDisplaySizesProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
)
