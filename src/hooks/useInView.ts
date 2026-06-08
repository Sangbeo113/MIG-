import { useState, useEffect, useRef, type RefObject } from 'react'

interface UseInViewOptions {
  threshold?: number
  triggerOnce?: boolean
  rootMargin?: string
}

interface UseInViewReturn<T extends Element> {
  ref: RefObject<T | null>
  isVisible: boolean
}

/**
 * IntersectionObserver hook.
 * Returns { ref, isVisible } — attach `ref` to the element you want to watch.
 *
 * @param options.threshold   - Intersection ratio to trigger (default 0.15)
 * @param options.triggerOnce - Only fire once, then disconnect (default true)
 * @param options.rootMargin  - Margin around the root (default '0px')
 */
export function useInView<T extends Element = HTMLDivElement>({
  threshold = 0.15,
  triggerOnce = true,
  rootMargin = '0px',
}: UseInViewOptions = {}): UseInViewReturn<T> {
  const ref = useRef<T>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (triggerOnce) observer.disconnect()
        } else if (!triggerOnce) {
          setIsVisible(false)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, triggerOnce, rootMargin])

  return { ref, isVisible }
}
