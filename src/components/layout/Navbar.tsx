import { useState, useRef, useEffect } from 'react'
import { useScrolled } from '@/hooks/useScrolled'
import { useGSAP } from '@/hooks/useGSAP'
import { gsap, scrollToTarget } from '@/lib/gsap-config'
import { NAV_ITEMS } from '@/lib/constants'
import { trackCTAClick } from '@/lib/analytics'

export default function Navbar() {
  const isScrolled = useScrolled(60)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLElement>(null)

  // Smooth scroll handler
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    setMobileMenuOpen(false)
    const target = document.querySelector(targetId)
    if (target) {
      scrollToTarget(targetId)
      // Manage focus for accessibility
      const focusableTarget = target as HTMLElement
      focusableTarget.tabIndex = -1
      focusableTarget.focus()
    }
  }

  // Keyboard accessibility for mobile menu (Escape to close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [mobileMenuOpen])

  // GSAP animation for mobile menu
  useGSAP(() => {
    if (!menuRef.current) return
    if (mobileMenuOpen) {
      gsap.to(menuRef.current, {
        height: 'auto',
        opacity: 1,
        duration: 0.4,
        ease: 'power3.out',
        display: 'block'
      })
      gsap.fromTo('.mobile-nav-item', 
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.3, stagger: 0.05, delay: 0.1 }
      )
    } else {
      gsap.to(menuRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power3.in',
        onComplete: () => {
          gsap.set(menuRef.current, { display: 'none' })
        }
      })
    }
  }, [mobileMenuOpen], navRef)

  return (
    <header
      ref={navRef}
      role="banner"
      className="fixed top-0 left-0 right-0 z-[100] transition-colors duration-300"
      style={{
        background: isScrolled ? 'rgba(15, 14, 12, 0.9)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(12px)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent',
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        {/* Logo */}
        <a 
          href="#hero" 
          onClick={(e) => handleScroll(e, '#hero')}
          aria-label="Về trang chủ MIG"
          className="flex items-center gap-2 group focus:outline-none focus:ring-2 focus:ring-[#C8A96E] rounded-sm p-1"
        >
          <span
            className="w-8 h-8 flex items-center justify-center rounded-sm text-[#0F0E0C] text-lg font-bold transition-transform group-hover:scale-105"
            style={{ background: '#C8A96E', fontFamily: 'var(--font-display)' }}
            aria-hidden="true"
          >
            M
          </span>
          <span
            className="text-white text-xl font-semibold tracking-widest uppercase transition-opacity group-hover:opacity-80"
            style={{ fontFamily: 'var(--font-display)' }}
            aria-hidden="true"
          >
            MIG
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Điều hướng chính">
          <ul className="flex items-center gap-8" role="list">
            {NAV_ITEMS.map((item) => (
              <li key={item.id} role="listitem">
                <a
                  href={item.href}
                  onClick={(e) => handleScroll(e, item.href)}
                  aria-label={item.ariaLabel}
                  className="text-sm text-white/80 hover:text-white transition-colors py-2 focus:outline-none focus:ring-2 focus:ring-[#C8A96E] rounded-sm"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#lien-he"
            onClick={(e) => {
              handleScroll(e, '#lien-he')
              trackCTAClick('lien-he-ngay', 'navbar_desktop')
            }}
            className="ml-4 rounded-sm px-6 py-2.5 text-sm font-semibold transition-all hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#0F0E0C]"
            style={{ background: '#C8A96E', color: '#0F0E0C' }}
            aria-label="Liên hệ ngay với MIG"
          >
            Liên hệ ngay
          </a>
        </nav>

        <button
          className="md:hidden p-3 w-12 h-12 flex items-center justify-center text-white/80 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#C8A96E] rounded-sm"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={mobileMenuOpen ? 'Đóng menu' : 'Mở menu'}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      <div 
        id="mobile-menu"
        ref={menuRef}
        className="md:hidden overflow-y-auto max-h-[calc(100svh-5rem)]"
        style={{ display: 'none', background: 'rgba(15, 14, 12, 0.98)' }}
      >
        <nav aria-label="Điều hướng trên di động" className="px-6 py-6 border-t border-white/5">
          <ul className="flex flex-col gap-4" role="list">
            {NAV_ITEMS.map((item) => (
              <li key={item.id} className="mobile-nav-item" role="listitem">
                <a
                  href={item.href}
                  onClick={(e) => handleScroll(e, item.href)}
                  aria-label={item.ariaLabel}
                  className="block text-lg text-white/80 hover:text-[#C8A96E] py-2 focus:outline-none focus:ring-2 focus:ring-[#C8A96E] rounded-sm"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="mobile-nav-item mt-4" role="listitem">
              <a
                href="#lien-he"
                onClick={(e) => {
                  handleScroll(e, '#lien-he')
                  trackCTAClick('lien-he-ngay', 'navbar_mobile')
                }}
                className="block text-center rounded-sm px-6 py-3 text-sm font-semibold w-full focus:outline-none focus:ring-2 focus:ring-white"
                style={{ background: '#C8A96E', color: '#0F0E0C' }}
                aria-label="Liên hệ ngay với MIG"
              >
                Liên hệ ngay
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
