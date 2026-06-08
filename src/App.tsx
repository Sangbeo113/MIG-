import '@/styles/globals.css'
import '@/styles/typography.css'
import '@/styles/animations.css'

import { useLayoutEffect, Suspense, lazy } from 'react'
import { initPageLoadAnimation, gsap } from '@/lib/gsap-config'

import SEOHead from '@/components/layout/SEOHead'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PageTransition from '@/components/layout/PageTransition'
import CustomCursor from '@/components/ui/CustomCursor'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'

// Lazy load non-critical sections
const Services = lazy(() => import('@/components/sections/Services'))
const Values = lazy(() => import('@/components/sections/Values'))
const Team = lazy(() => import('@/components/sections/Team'))
const Contact = lazy(() => import('@/components/sections/Contact'))

export default function App() {
  useLayoutEffect(() => {
    // Wait for a brief moment to ensure DOM is ready, then run animation
    const ctx = gsap.context(() => {
      initPageLoadAnimation()
    })
    return () => ctx.revert()
  }, [])

  return (
    <>
      <SEOHead />
      <CustomCursor />
      {/* Skip to main content (accessibility) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:rounded-sm focus:text-sm focus:font-medium"
        style={{ background: '#C8A96E', color: '#0F0E0C' }}
      >
        Bỏ qua điều hướng, đến nội dung chính
      </a>

      <Navbar />

      <PageTransition>
        <main id="main-content">
          <Hero />
          <About />
          <Suspense fallback={<div className="h-32 flex items-center justify-center opacity-50">Loading...</div>}>
            <Services />
            <Values />
            <Team />
            <Contact />
          </Suspense>
        </main>
        <Footer />
      </PageTransition>
    </>
  )
}
