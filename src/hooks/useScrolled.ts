import { useState, useEffect } from 'react'
import { debounce } from '@/lib/utils'

/**
 * Returns true when the page has been scrolled past the given threshold.
 * Used for Navbar background change on scroll.
 */
export function useScrolled(threshold = 60): boolean {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = debounce(() => {
      setScrolled(window.scrollY > threshold)
    }, 10)

    handler() // check immediately on mount
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [threshold])

  return scrolled
}
