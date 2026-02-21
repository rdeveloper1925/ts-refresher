import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import './styles/globals.css'

// import SupabaseCRUDComponent from './components/mine/SupabaseCRUD.tsx'
import NotFound from './pages/404.tsx'
import Home from './pages/Home.tsx'
import HomePage from './pages/HomePage.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route element={<HomePage />} path='/' />
                <Route element={<Home />} path='/home' />
                {/* <Route element={<App />} path='/home2' />
                <Route element={<Login />} path='/login-old' />
                <Route element={<EmlPass />} path='/login' />
                <Route element={<SupabaseCRUDComponent />} path='/supabase' /> 
                <Route element={<ReactToPDF />} path='/react-to-pdf' />
                <Route element={<RenderPDF />} path='/render-pdf' />
                <Route element={<JacPDF />} path='/jac-pdf' /> */}
                <Route element={<NotFound />} path='*' />
            </Routes>
        </BrowserRouter>
    </StrictMode>,
)
