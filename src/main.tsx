import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProvider } from '@/contexts/AppContext'
import { LegalProvider } from '@/components/Legal'
import { CookieBanner } from '@/components/CookieBanner'
import { MetrikaTracker } from '@/components/MetrikaTracker'
import { ScrollToTop } from '@/components/ScrollToTop'
import App from './App.tsx'
import { BlogIndex } from './pages/BlogIndex.tsx'
import { BlogPost } from './pages/BlogPost.tsx'
import { ProjectPage } from './pages/ProjectPage.tsx'
import { ContactsPage } from './pages/Contacts.tsx'
import { NotFound } from './pages/NotFound.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AppProvider>
        <LegalProvider>
          <ScrollToTop />
          <MetrikaTracker />
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/blog" element={<BlogIndex />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/projects/:slug" element={<ProjectPage />} />
            <Route path="/contacts" element={<ContactsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <CookieBanner />
        </LegalProvider>
      </AppProvider>
    </BrowserRouter>
  </StrictMode>,
)
