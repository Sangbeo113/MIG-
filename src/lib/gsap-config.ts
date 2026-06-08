import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { prefersReducedMotion } from '@/lib/utils'

// Register plugins globally
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

export { gsap, ScrollTrigger }

/**
 * Master Timeline for initial page load
 */
export function initPageLoadAnimation() {
  if (prefersReducedMotion()) return

  // Set initial states to prevent FOUC (Flash of Unstyled Content)
  gsap.set('header', { y: -100, opacity: 0 })
  gsap.set('.hero-badge', { y: 20, opacity: 0 })
  gsap.set('.hero-title-line', { y: 30, opacity: 0 })
  gsap.set('.hero-sub', { y: 20, opacity: 0 })
  gsap.set('.hero-cta', { y: 20, opacity: 0 })
  gsap.set('.hero-scroll-hint', { opacity: 0 })

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

  tl.to('header', { y: 0, opacity: 1, duration: 0.6 }, 0)
    .to('.hero-badge', { y: 0, opacity: 1, duration: 0.5 }, 0.3)
    .to('.hero-title-line', { y: 0, opacity: 1, duration: 0.7, stagger: 0.15 }, 0.5)
    .to('.hero-sub', { y: 0, opacity: 1, duration: 0.8 }, 1.0)
    .to('.hero-cta', { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 }, 1.2)
    .to('.hero-scroll-hint', { opacity: 1, duration: 1 }, 1.5)

  // Decorative lines
  gsap.set('.hero-dec-line', { scaleX: 0 })
  tl.to('.hero-dec-line', { scaleX: 1, duration: 1.5, stagger: 0.1, ease: 'power2.inOut', transformOrigin: 'left' }, 0.5)

  return tl
}

/**
 * Helper to create a ScrollReveal animation configuration
 */
export function createScrollReveal(options: { y?: number, x?: number, duration?: number, delay?: number, stagger?: number } = {}) {
  const { y = 40, x = 0, duration = 0.8, stagger, delay = 0 } = options
  return {
    from: { opacity: 0, y, x },
    to: { opacity: 1, y: 0, x: 0, duration, stagger, delay, ease: 'power3.out' }
  }
}

/**
 * Helper to setup GSAP smooth scroll
 */
export function scrollToTarget(target: string | Element | number, options = {}) {
  if (prefersReducedMotion()) {
    const el = typeof target === 'string' ? document.querySelector(target) : target
    if (el instanceof Element) el.scrollIntoView({ behavior: 'smooth' })
    else if (typeof target === 'number') window.scrollTo({ top: target, behavior: 'smooth' })
    return
  }
  gsap.to(window, {
    scrollTo: target,
    duration: 0.8,
    ease: 'power2.inOut',
    ...options
  })
}
