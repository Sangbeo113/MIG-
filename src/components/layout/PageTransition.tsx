import { useRef, type ReactNode } from 'react'
import { useGSAP } from '@/hooks/useGSAP'
import { gsap } from '@/lib/gsap-config'

interface PageTransitionProps {
  children: ReactNode
}

/**
 * Wraps page content with a fade-in entrance animation.
 * Cleanup is handled automatically via useGSAP.
 */
export default function PageTransition({ children }: PageTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.from(containerRef.current, {
      opacity: 0,
      y: 12,
      duration: 0.6,
      ease: 'power2.out',
      clearProps: 'all',
    })
  }, [], containerRef)

  return (
    <div ref={containerRef} className="page-transition-wrapper">
      {children}
    </div>
  )
}
