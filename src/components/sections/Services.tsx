import { useRef, useState, useLayoutEffect } from 'react'
import { useScrollReveal, useHoverMagnetic } from '@/hooks/useGSAP'
import { gsap } from '@/lib/gsap-config'
import { SERVICES } from '@/lib/constants'
import { trackServiceCardClick } from '@/lib/analytics'
import { prefersReducedMotion } from '@/lib/utils'

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<(HTMLElement | null)[]>([])

  useScrollReveal('.services-header', { y: 30 })
  useScrollReveal('.service-card', { y: 40, stagger: 0.12 })

  return (
    <section
      id="dich-vu"
      ref={sectionRef}
      aria-labelledby="services-heading"
      className="py-24 md:py-32"
      style={{ background: '#0F0E0C' }}
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        
        {/* Section Header */}
        <div className="services-header services-anim text-center mb-16 md:mb-24">
          <p className="mb-4 text-[0.72rem] font-semibold tracking-[0.2em] uppercase" style={{ color: '#DFC08A' }}>
            Dịch vụ cốt lõi
          </p>
          <h2
            id="services-heading"
            className="font-normal max-w-2xl mx-auto mb-6"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', lineHeight: 1.15, letterSpacing: '-0.02em', color: '#fff' }}
          >
            Giải pháp toàn diện cho <em style={{ color: '#C8A96E', fontStyle: 'italic' }}>doanh nghiệp</em>
          </h2>
          <p className="text-base max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Từ việc định hình chiến lược ban đầu đến triển khai công nghệ và quản trị thương hiệu, 
            chúng tôi mang đến các giải pháp may đo sát với thực tiễn thị trường.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" role="list">
          {SERVICES.map((service, i) => (
            <ServiceCard 
              key={service.id} 
              service={service} 
              ref={(el) => { cardsRef.current[i] = el }}
            />
          ))}
        </div>

      </div>
    </section>
  )
}

// ─── Sub-component for individual card with complex interactions ──────────────
import type { Service } from '@/types'

const ServiceCard = React.forwardRef<HTMLElement, { service: Service }>(({ service }, ref) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const iconRef = useRef<HTMLDivElement>(null)

  // Use Magnetic Hover
  useHoverMagnetic(cardRef, 10)

  // Expand/Collapse animation
  useLayoutEffect(() => {
    if (!contentRef.current) return
    if (isExpanded) {
      gsap.to(contentRef.current, { height: 'auto', opacity: 1, duration: 0.4, ease: 'power3.out' })
    } else {
      gsap.to(contentRef.current, { height: 0, opacity: 0, duration: 0.3, ease: 'power3.in' })
    }
  }, [isExpanded])

  // Hover icon animation
  useLayoutEffect(() => {
    if (!iconRef.current || prefersReducedMotion()) return
    if (isHovered) {
      gsap.to(iconRef.current, { scale: 1.05, rotation: 5, duration: 0.3, ease: 'back.out(1.5)' })
    } else {
      gsap.to(iconRef.current, { scale: 1, rotation: 0, duration: 0.3, ease: 'power2.out' })
    }
  }, [isHovered])

  return (
    <article
      ref={(el) => {
        if (typeof ref === 'function') ref(el)
        else if (ref) ref.current = el
        // Assign to internal ref for magnetic hover
        ;(cardRef as React.MutableRefObject<HTMLElement | null>).current = el
      }}
      className="service-card services-anim group relative rounded-sm p-6 sm:p-8 cursor-pointer overflow-hidden transition-all duration-300 flex flex-col opacity-0"
      style={{
        background: isHovered || isExpanded ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.03)',
        transform: isHovered && !prefersReducedMotion() ? 'translateY(-4px)' : 'none',
        boxShadow: isHovered ? '0 10px 30px -10px rgba(0,0,0,0.5)' : 'none',
      }}
      role="listitem"
      aria-expanded={isExpanded}
      onClick={() => {
        setIsExpanded(!isExpanded)
        if (!isExpanded) trackServiceCardClick(service.id)
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          setIsExpanded(!isExpanded)
          if (!isExpanded) trackServiceCardClick(service.id)
        }
      }}
    >
      {/* Accent line top left */}
      <div 
        className="absolute top-0 left-0 w-8 h-1" 
        style={{ background: '#C8A96E' }} 
        aria-hidden="true" 
      />

      {/* Hover bottom line */}
      <div 
        className="absolute bottom-0 left-0 w-full h-1 origin-left transition-transform duration-300 ease-out" 
        style={{ 
          background: 'rgba(200,169,110,0.6)', 
          transform: isHovered ? 'scaleX(1)' : 'scaleX(0)' 
        }} 
        aria-hidden="true" 
      />

      {/* Icon */}
      <div
        ref={iconRef}
        className="w-12 h-12 flex items-center justify-center text-[1.8rem] mb-6"
        style={{ color: '#C8A96E' }}
        aria-hidden="true"
      >
        {service.icon}
      </div>

      <h3
        className="mb-3 font-semibold transition-colors duration-300"
        style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: isHovered ? '#C8A96E' : '#fff' }}
      >
        {service.title}
      </h3>

      <p 
        className="leading-relaxed mb-4 flex-grow transition-opacity duration-300" 
        style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.5)', opacity: isExpanded ? 0 : 1, display: isExpanded ? 'none' : 'block' }}
      >
        {service.shortDesc}
      </p>

      {/* Collapsible Content */}
      <div ref={contentRef} className="overflow-hidden" style={{ height: 0, opacity: 0 }}>
        <p className="leading-relaxed mb-5" style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.7)' }}>
          {service.fullDesc}
        </p>
        <ul className="flex flex-col gap-3" role="list">
          {service.features.map((feat: string, idx: number) => (
            <li key={idx} className="flex items-start gap-2" style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)' }}>
              <span style={{ color: '#C8A96E' }} aria-hidden="true">▸</span>
              <span>{feat}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Toggle Hint */}
      <div 
        className="mt-6 flex justify-end" 
        aria-hidden="true"
      >
        <div 
          className="w-6 h-6 rounded-full flex items-center justify-center border transition-all duration-300"
          style={{ 
            borderColor: isHovered ? '#C8A96E' : 'rgba(255,255,255,0.1)',
            color: isHovered ? '#C8A96E' : 'rgba(255,255,255,0.3)',
            transform: isExpanded ? 'rotate(45deg)' : 'none',
            background: isHovered ? 'rgba(200,169,110,0.1)' : 'transparent'
          }}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12h14"/>
          </svg>
        </div>
      </div>
    </article>
  )
})

ServiceCard.displayName = 'ServiceCard'
import React from 'react'
