import { useRef, useLayoutEffect, type DependencyList, type RefObject } from 'react'
import { gsap, ScrollTrigger, createScrollReveal } from '@/lib/gsap-config'
import { prefersReducedMotion } from '@/lib/utils'

type GSAPCallback = (context: gsap.Context) => void

/**
 * Base GSAP hook with context cleanup
 */
export function useGSAP<T extends Element = HTMLElement>(
  callback: GSAPCallback,
  deps: DependencyList = [],
  scope?: RefObject<T | null>
): void {
  const ctx = useRef<gsap.Context | null>(null)

  useLayoutEffect(() => {
    // We allow running without a scope for global animations
    ctx.current = gsap.context(callback, scope?.current || undefined)
    return () => {
      ctx.current?.revert()
      ctx.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

/**
 * Preset: Scroll Reveal (fade up/down/left/right on scroll)
 */
interface ScrollRevealOptions {
  y?: number
  x?: number
  duration?: number
  delay?: number
  stagger?: number
  ease?: string
  start?: string
  markers?: boolean
}

export function useScrollReveal<T extends Element = HTMLElement>(
  ref: RefObject<T | null> | string,
  options: ScrollRevealOptions = {},
  scope?: RefObject<HTMLElement | null>
) {
  useGSAP(() => {
    if (prefersReducedMotion()) {
      gsap.set(ref, { opacity: 1, y: 0, x: 0 })
      return
    }
    const { from, to } = createScrollReveal({ 
      y: options.y, 
      x: options.x, 
      duration: options.duration, 
      delay: options.delay, 
      stagger: options.stagger 
    })
    
    gsap.fromTo(ref, from, {
      ...to,
      ease: options.ease || to.ease,
      scrollTrigger: {
        trigger: ref instanceof Element || typeof ref === 'string' ? ref : undefined,
        start: options.start || 'top 85%',
        markers: options.markers,
      }
    })
  }, [], scope)
}

export function useScrollRevealLeft<T extends Element = HTMLElement>(ref: RefObject<T | null> | string, scope?: RefObject<HTMLElement | null>) {
  useScrollReveal(ref, { x: -60, y: 0 }, scope)
}

export function useScrollRevealRight<T extends Element = HTMLElement>(ref: RefObject<T | null> | string, scope?: RefObject<HTMLElement | null>) {
  useScrollReveal(ref, { x: 60, y: 0 }, scope)
}

/**
 * Preset: Parallax scrolling
 */
export function useParallax<T extends Element = HTMLElement>(
  ref: RefObject<T | null> | string,
  strength: number = 0.3,
  scope?: RefObject<HTMLElement | null>
) {
  useGSAP(() => {
    if (prefersReducedMotion()) return
    const el = typeof ref === 'string' ? gsap.utils.toArray(ref)[0] : ref.current
    if (!el) return

    ScrollTrigger.create({
      trigger: el as Element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      animation: gsap.fromTo(el, 
        { y: -100 * strength }, 
        { y: 100 * strength, ease: 'none' }
      )
    })
  }, [strength], scope)
}

/**
 * Preset: Magnetic Hover
 */
export function useHoverMagnetic<T extends Element = HTMLElement>(
  ref: RefObject<T | null>,
  strength: number = 15
) {
  useGSAP(() => {
    if (prefersReducedMotion()) return
    const el = ref.current
    if (!el) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const x = ((e.clientX - centerX) / (rect.width / 2)) * strength
      const y = ((e.clientY - centerY) / (rect.height / 2)) * strength
      gsap.to(el, { x, y, duration: 0.3, ease: 'power2.out' })
    }

    const handleMouseLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' })
    }

    el.addEventListener('mousemove', handleMouseMove as EventListener)
    el.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      el.removeEventListener('mousemove', handleMouseMove as EventListener)
      el.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [strength], ref)
}
