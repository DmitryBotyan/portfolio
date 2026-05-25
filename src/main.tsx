import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProvider } from '@/contexts/AppContext'
import { LegalProvider } from '@/components/Legal'
import { CookieBanner } from '@/components/CookieBanner'
import { MetrikaTracker } from '@/components/MetrikaTracker'
import App from './App.tsx'
import { BlogIndex } from './pages/BlogIndex.tsx'
import { BlogPost } from './pages/BlogPost.tsx'
import { NotFound } from './pages/NotFound.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AppProvider>
        <LegalProvider>
          <MetrikaTracker />
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/blog" element={<BlogIndex />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <CookieBanner />
        </LegalProvider>
      </AppProvider>
    </BrowserRouter>
  </StrictMode>,
)
