import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import App from './App.tsx'
import SupabaseCRUDComponent from './components/mine/SupabaseCRUD.tsx'
import NotFound from './pages/404.tsx'
import AiForm from './pages/AiForm.tsx'
import EmlPass from './pages/emailpass/EmlPass.tsx'
import Home from './pages/Home.tsx'
import HomePage from './pages/HomePage.tsx'
import Login from './pages/Login.tsx'
import './styles/globals.css'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route element={<HomePage />} path='/' />
                <Route element={<Home />} path='/home' />
                <Route element={<App />} path='/home2' />
                <Route element={<Login />} path='/login-old' />
                <Route element={<AiForm />} path='/ai' />
                <Route element={<EmlPass />} path='/login' />
                <Route element={<SupabaseCRUDComponent />} path='/supabase' />
                <Route element={<NotFound />} path='*' />
            </Routes>
        </BrowserRouter>
    </StrictMode>,
)
