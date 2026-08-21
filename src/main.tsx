import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.css'
import HomePage from './pages/HomePage.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <HomePage />
    </StrictMode>,
)
