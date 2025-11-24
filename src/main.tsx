import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import './styles/globals.css'
import Home from './pages/Home.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import App from './App.tsx'
import NotFound from './pages/404.tsx'
import SupabaseCRUDComponent from './components/mine/SupabaseCRUD.tsx'
import Login from './pages/Login.tsx'
import ReactToPDF from './pages/ReactToPDF.tsx'
import RenderPDF from './pages/RenderPDF.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route element={<Home />} path='/home'/>
      <Route element={<App />} path='/home2'/>
      <Route element={<Login />} path='/'/>
      <Route element={<SupabaseCRUDComponent />} path='/supabase'/>
      <Route element={<ReactToPDF />} path='/react-to-pdf'/>
      <Route element={<RenderPDF />} path='/render-pdf'/>
      <Route element={<NotFound/>} path='*'/>
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
