import { useRef } from 'react'
import { useScrollReveal } from '@/hooks/useGSAP'
import { TEAM_MEMBERS } from '@/lib/constants'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { prefersReducedMotion } from '@/lib/utils'

export default function Team() {
  const sectionRef = useRef<HTMLElement>(null)

  useScrollReveal('.team-header', { y: 30 })
  useScrollReveal('.team-card', { y: 40, stagger: 0.15 })

  return (
    <section
      id="doi-ngu"
      ref={sectionRef}
      aria-labelledby="team-heading"
      className="py-24 md:py-32"
      style={{ background: '#F8F5F0' }}
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        
        {/* Header */}
        <div className="team-header team-anim text-left mb-16 opacity-0">
          <p className="mb-4 text-[0.72rem] font-semibold tracking-[0.2em] uppercase" style={{ color: '#C8A96E' }}>
            Đội ngũ lãnh đạo
          </p>
          <h2
            id="team-heading"
            className="font-normal max-w-2xl"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', lineHeight: 1.15, letterSpacing: '-0.02em', color: '#1A1712' }}
          >
            Những người <em style={{ color: '#C8A96E', fontStyle: 'italic' }}>dẫn đường</em>
          </h2>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" role="list">
          {TEAM_MEMBERS.map((member) => (
            <Dialog key={member.id}>
              <DialogTrigger asChild>
                <article
                  className="team-card team-anim group cursor-pointer rounded-sm p-6 transition-all duration-300 text-left focus:outline-none focus:ring-2 focus:ring-[#C8A96E] opacity-0"
                  style={{ background: '#fff', border: '1px solid rgba(26,23,18,0.05)' }}
                  onMouseEnter={(e) => {
                    if (!prefersReducedMotion()) e.currentTarget.style.transform = 'translateY(-4px)'
                    e.currentTarget.style.boxShadow = '0 10px 30px -10px rgba(0,0,0,0.1)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'none'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                  role="listitem"
                  aria-label={`Xem chi tiết hồ sơ ${member.name}`}
                >
                  {/* Avatar Circle */}
                  <div 
                    className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center border-2 transition-transform duration-300 group-hover:scale-105"
                    style={{ 
                      background: 'linear-gradient(135deg, #0F0E0C, #1A1712)', 
                      borderColor: '#C8A96E' 
                    }}
                  >
                    <span 
                      className="text-2xl font-normal" 
                      style={{ fontFamily: 'var(--font-display)', color: '#C8A96E' }}
                      aria-hidden="true"
                    >
                      {member.initials}
                    </span>
                  </div>

                  <div className="text-center">
                    <h3 className="font-bold mb-1" style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: '#1A1712' }}>
                      {member.name}
                    </h3>
                    <p className="font-semibold tracking-wider uppercase mb-4" style={{ fontSize: '0.82rem', color: '#A88848' }}>
                      {member.role}
                    </p>
                    
                    {/* Hover Bio snippet */}
                    <div className="overflow-hidden relative h-16">
                      <p 
                        className="text-sm leading-relaxed transition-opacity duration-300 opacity-0 group-hover:opacity-100" 
                        style={{ color: '#6B6560' }}
                      >
                        {member.bio.substring(0, 60)}...
                      </p>
                    </div>
                  </div>
                </article>
              </DialogTrigger>
              
              <DialogContent>
                <div className="text-center pt-4">
                  <div 
                    className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center border-2"
                    style={{ background: 'linear-gradient(135deg, #0F0E0C, #1A1712)', borderColor: '#C8A96E' }}
                  >
                    <span className="text-2xl font-normal" style={{ fontFamily: 'var(--font-display)', color: '#C8A96E' }}>
                      {member.initials}
                    </span>
                  </div>
                  <h3 className="font-bold mb-1" style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: '#1A1712' }}>
                    {member.name}
                  </h3>
                  <p className="font-semibold tracking-wider uppercase mb-6" style={{ fontSize: '0.85rem', color: '#A88848' }}>
                    {member.role}
                  </p>
                  <p className="text-sm leading-relaxed text-left mb-8" style={{ color: '#6B6560' }}>
                    {member.bio}
                  </p>
                  {member.linkedIn && (
                    <a
                      href={member.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-sm px-6 py-3 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#C8A96E]"
                      style={{ background: '#0F0E0C', color: '#C8A96E' }}
                      aria-label={`Truy cập LinkedIn của ${member.name}`}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                      Hồ sơ LinkedIn
                    </a>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  )
}
