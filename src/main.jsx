import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ThemeProvider } from "./Admin/ThemeContext.jsx";
//import Footer from './components/Footer'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
    <App className="h-100" />
  </ThemeProvider>,
  </StrictMode>,
)
