import { useEffect } from 'react'
import { Nav } from '@/components/Nav'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Team } from '@/components/sections/Team'
import { Services } from '@/components/sections/Services'
import { Calculator } from '@/components/sections/Calculator'
import { Experience } from '@/components/sections/Experience'
import { Projects } from '@/components/sections/Projects'
import { Blog } from '@/components/sections/Blog'
import { Testimonials } from '@/components/sections/Testimonials'
import { Faq } from '@/components/sections/Faq'
import { Contact } from '@/components/sections/Contact'
import { Footer } from '@/components/sections/Footer'
import { FloatingCTA } from '@/components/FloatingCTA'
import { PopupCTA } from '@/components/PopupCTA'

function App() {
  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      const id = setTimeout(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
      }, 120)
      return () => clearTimeout(id)
    }
  }, [])

  return (
    <div className="relative">
      <Nav />
      <main>
        <Hero />
        <Projects />
        <Services />
        <Calculator />
        <About />
        <Team />
        <Experience />
        <Testimonials />
        <Blog />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <FloatingCTA />
      <PopupCTA />
    </div>
  )
}

export default App
