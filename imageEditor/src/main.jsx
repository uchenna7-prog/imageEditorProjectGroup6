import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ImageDisplayProvider } from "./contexts/ImageDisplayContext.jsx"
import { ThemeProvider } from './contexts/ThemeContext.jsx'
import { SidebarProvider } from './contexts/SidebarContext';
import { BrowserRouter } from "react-router-dom";
import { ImageProvider } from './contexts/ImageContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <ImageDisplayProvider>
          <SidebarProvider>
            <ImageProvider>
              <App/>
            </ImageProvider>
          </SidebarProvider>
        </ImageDisplayProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
)
