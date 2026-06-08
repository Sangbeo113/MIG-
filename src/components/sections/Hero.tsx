import { useRef } from 'react'
import { useParallax } from '@/hooks/useGSAP'
import { scrollToTarget } from '@/lib/gsap-config'
import { trackCTAClick } from '@/lib/analytics'


export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  // Use generalized parallax hooks instead of local ScrollTrigger
  useParallax(bgRef, 0.2)
  useParallax(contentRef, 0.4)

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    scrollToTarget(targetId)
  }

  return (
    <section
      id="hero"
      ref={sectionRef}
      aria-label="MIG Corporation – Trang chủ"
      className="relative w-full h-[100svh] min-h-[600px] flex flex-col justify-center overflow-hidden"
      style={{ background: '#0F0E0C' }}
    >
      <div 
        ref={bgRef}
        className="absolute inset-0 pointer-events-none z-0"
        aria-hidden="true"
      >
        <picture>
          <source srcSet="/public/brand/hero-bg-texture.webp" type="image/webp" />
          <img 
            src="/public/brand/hero-bg-texture.png" 
            alt=""
            className="w-full h-full object-cover opacity-15"
            loading="eager"
            fetchPriority="high"
          />
        </picture>
      </div>

      {/* SVG Noise Filter Grain Overlay */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-20" aria-hidden="true">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>

      {/* Gold Radial Glow */}
      <div 
        className="absolute top-0 right-0 w-[800px] h-[800px] pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle at top right, rgba(200,169,110,0.12) 0%, transparent 60%)',
          transform: 'translate(20%, -20%)'
        }}
        aria-hidden="true"
      />

      {/* Decorative Horizontal Lines */}
      <div className="absolute inset-0 pointer-events-none z-0 flex flex-col justify-between py-20" aria-hidden="true">
        {[...Array(8)].map((_, i) => (
          <div 
            key={i} 
            className="hero-dec-line w-full h-[1px]" 
            style={{ background: 'rgba(200,169,110,0.06)' }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div ref={contentRef} className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-10 w-full pt-16">
        
        {/* Badge */}
        <div className="hero-badge hero-anim flex items-center gap-3 mb-8 w-fit rounded-full px-4 py-2 border" style={{ borderColor: 'rgba(200,169,110,0.3)', background: 'rgba(15,14,12,0.6)', backdropFilter: 'blur(4px)' }}>
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: '#C8A96E' }}></span>
            <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: '#C8A96E' }}></span>
          </span>
          <span className="text-xs font-medium tracking-wide uppercase" style={{ color: '#DFC08A' }}>
            Đối tác chiến lược tin cậy tại Việt Nam
          </span>
        </div>

        {/* Headline */}
        <h1 
          className="font-normal mb-8 mx-auto"
          style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 8vw, 7rem)', lineHeight: 1.05, letterSpacing: '-0.02em', color: '#fff' }}
        >
          <span className="hero-title-line hero-anim block">Kiến Tạo</span>
          <span className="hero-title-line hero-anim block" style={{ color: '#C8A96E', fontStyle: 'italic' }}>Giá Trị</span>
          <span className="hero-title-line hero-anim block">Bền Vững</span>
        </h1>

        {/* Subheadline */}
        <p className="hero-sub hero-anim text-lg md:text-xl max-w-2xl mb-12 leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
          MIG đồng hành cùng doanh nghiệp xây dựng nền tảng vững chắc — từ chiến lược, công nghệ đến thương hiệu — để tạo ra giá trị thực và bền vững trong kỷ nguyên số.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-4 sm:gap-6 mt-12 mb-16">
          <a
            href="#lien-he"
            onClick={(e) => {
              handleScroll(e, '#lien-he')
              trackCTAClick('bat-dau-hop-tac', 'hero')
            }}
            className="hero-cta hero-anim inline-flex items-center justify-center w-full sm:w-auto rounded-sm px-8 py-4 text-sm font-semibold transition-all hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#0F0E0C]"
            style={{ background: '#C8A96E', color: '#0F0E0C' }}
            onMouseOver={(e) => e.currentTarget.style.background = '#DFC08A'}
            onMouseOut={(e) => e.currentTarget.style.background = '#C8A96E'}
            aria-label="Bắt đầu hợp tác với MIG"
          >
            Bắt đầu hợp tác
          </a>
          <a
            href="#ve-chung-toi"
            onClick={(e) => {
              handleScroll(e, '#ve-chung-toi')
              trackCTAClick('kham-pha-them', 'hero')
            }}
            className="hero-cta hero-anim inline-flex items-center gap-2 pb-1 text-sm font-medium transition-all group focus:outline-none focus:ring-2 focus:ring-[#C8A96E] rounded-sm"
            style={{ color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.3)' }}
            onMouseOver={(e) => e.currentTarget.style.borderColor = '#C8A96E'}
            onMouseOut={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'}
            aria-label="Khám phá thêm về chúng tôi"
          >
            Khám phá thêm
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>

      </div>

      <div 
        className="hero-scroll-hint hero-anim absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-3 z-20"
        aria-hidden="true"
      >
        <span className="text-[0.65rem] font-semibold tracking-[0.2em] uppercase" style={{ color: 'rgba(255,255,255,0.4)' }}>
          Cuộn xuống
        </span>
        <div className="w-[1px] h-12 overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
          <div className="w-full h-1/2 animate-[scroll_2s_ease-in-out_infinite]" style={{ background: '#C8A96E' }} />
        </div>
      </div>
    </section>
  )
}
