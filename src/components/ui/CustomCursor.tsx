import { useRef, useEffect, useState } from 'react'
import { gsap } from '@/lib/gsap-config'
import { prefersReducedMotion } from '@/lib/utils'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    // Check if touch device
    const mediaQuery = window.matchMedia('(pointer: coarse)')
    setIsTouch(mediaQuery.matches)
    
    const handler = (e: MediaQueryListEvent) => setIsTouch(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    if (isTouch || prefersReducedMotion()) return
    
    const dot = dotRef.current
    const ring = ringRef.current
    const text = textRef.current
    if (!dot || !ring || !text) return

    // Quick setters for performance
    const setDotX = gsap.quickSetter(dot, "x", "px")
    const setDotY = gsap.quickSetter(dot, "y", "px")
    const setRingX = gsap.quickSetter(ring, "x", "px")
    const setRingY = gsap.quickSetter(ring, "y", "px")

    // We store positions to animate the ring with lag
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 }

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      setDotX(mouse.x)
      setDotY(mouse.y)
    }

    // Ticker for smooth lag on ring
    const ticker = gsap.ticker.add(() => {
      const dt = 1.0 - Math.pow(1.0 - 0.15, gsap.ticker.deltaRatio())
      pos.x += (mouse.x - pos.x) * dt
      pos.y += (mouse.y - pos.y) * dt
      setRingX(pos.x)
      setRingY(pos.y)
    })

    // Hover logic
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive = target.closest('a, button, input, select, textarea, [role="button"]')
      const isServiceCard = target.closest('.service-card')

      if (isServiceCard) {
        gsap.to(ring, { scale: 2, backgroundColor: 'rgba(200,169,110,0.9)', borderColor: 'transparent', duration: 0.3 })
        gsap.to(dot, { opacity: 0, duration: 0.2 })
        gsap.to(text, { opacity: 1, duration: 0.2 })
      } else if (isInteractive) {
        gsap.to(ring, { scale: 1.5, borderColor: '#C8A96E', backgroundColor: 'rgba(200,169,110,0.1)', duration: 0.3 })
      }
    }

    const handleMouseOut = () => {
      gsap.to(ring, { scale: 1, borderColor: 'rgba(255,255,255,0.4)', backgroundColor: 'transparent', duration: 0.3 })
      gsap.to(dot, { opacity: 1, duration: 0.2 })
      gsap.to(text, { opacity: 0, duration: 0.2 })
    }

    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
      gsap.ticker.remove(ticker)
    }
  }, [isTouch])

  if (isTouch) return null

  return (
    <>
      <div 
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{ background: '#fff', transform: 'translate(-50%, -50%)' }}
        aria-hidden="true"
      />
      <div 
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full border pointer-events-none z-[9998] flex items-center justify-center transition-colors"
        style={{ borderColor: 'rgba(255,255,255,0.4)', transform: 'translate(-50%, -50%)' }}
        aria-hidden="true"
      >
        <span 
          ref={textRef} 
          className="text-[0.5rem] font-bold tracking-widest uppercase text-[#0F0E0C] opacity-0 text-center leading-none"
        >
          Xem<br/>thêm
        </span>
      </div>
    </>
  )
}
