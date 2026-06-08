import { useRef, useState } from 'react'
import { useGSAP } from '@/hooks/useGSAP'
import { gsap, ScrollTrigger } from '@/lib/gsap-config'
import { VALUES } from '@/lib/constants'
import { prefersReducedMotion } from '@/lib/utils'

export default function Values() {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section
      id="gia-tri"
      ref={sectionRef}
      aria-label="Giá trị cốt lõi"
      className="py-24"
      style={{ background: '#EDE8DF' }}
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-6 relative">
          
          {/* Desktop Separators */}
          <div className="hidden lg:block absolute top-0 bottom-0 left-[25%] w-[1px]" style={{ background: 'rgba(26,23,18,0.06)' }} aria-hidden="true" />
          <div className="hidden lg:block absolute top-0 bottom-0 left-[50%] w-[1px]" style={{ background: 'rgba(26,23,18,0.06)' }} aria-hidden="true" />
          <div className="hidden lg:block absolute top-0 bottom-0 left-[75%] w-[1px]" style={{ background: 'rgba(26,23,18,0.06)' }} aria-hidden="true" />

          {VALUES.map((stat, i) => (
            <ValueItem 
              key={stat.label} 
              stat={stat} 
              index={i} 
              sectionRef={sectionRef} 
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Sub-component for individual stat with CountUp ───────────────────────────
import type { ValueStat } from '@/types'

function ValueItem({ stat, index, sectionRef }: { stat: ValueStat, index: number, sectionRef: React.RefObject<HTMLElement | null> }) {
  // Parse target number from string (e.g. "200+" -> 200)
  const targetNumber = parseInt(stat.number.replace(/\D/g, ''), 10) || 0
  const suffix = stat.number.replace(/\d/g, '') // extract "+", "%", etc.

  const [count, setCount] = useState(0)
  const itemRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!itemRef.current || !sectionRef.current) return
    const isReduced = prefersReducedMotion()

    if (isReduced) {
      setCount(targetNumber)
      gsap.to(itemRef.current, { opacity: 1, duration: 0.1 })
    } else {
      // Determine duration based on target magnitude to match specs
      const duration = targetNumber > 50 ? 2 : 1.5

      ScrollTrigger.create({
        trigger: itemRef.current,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.fromTo(itemRef.current, 
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: index * 0.1 }
          )

          const counter = { val: 0 }
          gsap.to(counter, {
            val: targetNumber,
            duration: duration,
            ease: 'power2.out',
            delay: index * 0.1 + 0.2,
            onUpdate: () => setCount(Math.round(counter.val))
          })
        }
      })
    }
  }, [], sectionRef)

  return (
    <article
      ref={itemRef}
      className="text-center relative px-4 opacity-0"
      aria-label={`${stat.number} ${stat.label}`}
    >
      <div 
        className="font-normal mb-2 tabular-nums"
        style={{ fontFamily: 'var(--font-display)', color: '#A88848', lineHeight: 1, fontSize: 'clamp(2rem, 5vw, 3.2rem)' }}
        aria-live="polite"
      >
        {count}{suffix}
      </div>
      
      <h3 className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: '#1A1712' }}>
        {stat.label}
      </h3>
      
      <p className="text-sm leading-relaxed max-w-[200px] mx-auto" style={{ color: '#6B6560' }}>
        {stat.sublabel}
      </p>
    </article>
  )
}
