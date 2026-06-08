import { useRef } from 'react'
import { useScrollRevealLeft, useScrollRevealRight, useScrollReveal } from '@/hooks/useGSAP'

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)

  const visualColRef = useRef<HTMLDivElement>(null)
  const textColRef = useRef<HTMLDivElement>(null)
  const card1Ref = useRef<HTMLDivElement>(null)
  const card2Ref = useRef<HTMLDivElement>(null)

  useScrollRevealLeft(visualColRef)
  useScrollRevealRight(textColRef)
  useScrollReveal(card1Ref, { duration: 0.8, delay: 0.2, y: 0, x: 0 })
  useScrollReveal(card2Ref, { duration: 0.8, delay: 0.4, y: 0, x: 0 })

  return (
    <section
      id="ve-chung-toi"
      ref={sectionRef}
      aria-labelledby="about-heading"
      className="py-24 md:py-32 overflow-hidden"
      style={{ background: '#F8F5F0' }}
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* Left Column — Visual Composition */}
          <div ref={visualColRef} className="about-visual-col about-anim relative h-[400px] sm:h-[550px] w-full max-w-[500px] mx-auto lg:mx-0 opacity-0 order-first lg:order-none">
            {/* Decorative Circle */}
            <div 
              className="absolute top-10 -left-10 w-64 h-64 rounded-full border border-[#C8A96E] opacity-25"
              aria-hidden="true"
            />
            
            {/* Large Card: Year Founded */}
            <div 
              ref={card1Ref}
              className="about-card absolute top-0 left-0 w-[72%] h-[80%] rounded-sm flex flex-col justify-end p-8 shadow-2xl opacity-0"
              style={{ background: '#0F0E0C', borderTop: '4px solid #C8A96E' }}
            >
              <div 
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{ backgroundImage: 'url(/public/brand/hero-bg-texture.png)', backgroundSize: 'cover' }}
                aria-hidden="true"
              />
              <div className="relative z-10">
                <p 
                  className="text-6xl sm:text-7xl font-normal leading-none mb-2"
                  style={{ fontFamily: 'var(--font-display)', color: '#C8A96E' }}
                >
                  2009
                </p>
                <p className="text-sm font-semibold tracking-widest uppercase text-white/70">
                  Thành lập
                </p>
              </div>
            </div>

            {/* Small Card: Projects */}
            <div 
              ref={card2Ref}
              className="about-card absolute bottom-0 right-0 w-[60%] sm:w-[52%] rounded-sm p-6 sm:p-8 shadow-xl opacity-0"
              style={{ background: '#EDE8DF', border: '1px solid rgba(26,23,18,0.05)' }}
            >
              <p 
                className="text-4xl sm:text-5xl font-normal leading-none mb-3"
                style={{ fontFamily: 'var(--font-display)', color: '#1A1712' }}
              >
                200+
              </p>
              <p className="text-sm font-medium leading-tight" style={{ color: '#6B6560' }}>
                Dự án thành công<br/>trong và ngoài nước
              </p>
            </div>
          </div>

          {/* Right Column — Text Content */}
          <div ref={textColRef} className="max-w-xl opacity-0 order-last lg:order-none">
            <p 
              className="about-text-anim about-anim mb-4 text-[0.72rem] font-semibold tracking-[0.2em] uppercase" 
              style={{ color: '#C8A96E' }}
            >
              Về chúng tôi
            </p>
            <h2
              id="about-heading"
              className="about-text-anim about-anim mb-8 font-normal"
              style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', lineHeight: 1.15, letterSpacing: '-0.02em', color: '#1A1712' }}
            >
              Hơn 15 năm <em style={{ color: '#C8A96E', fontStyle: 'italic' }}>kiến tạo giá trị</em>
            </h2>

            <div className="about-text-anim about-anim space-y-5 mb-10">
              <p className="text-[1.05rem] leading-[1.8]" style={{ color: '#6B6560' }}>
                Từ những ngày đầu khởi nghiệp vào năm 2009, MIG đã đặt ra mục tiêu rõ ràng: trở thành bệ phóng vững chắc cho các doanh nghiệp B2B tại Việt Nam. Chúng tôi không chỉ cung cấp dịch vụ, mà còn trao đi những giải pháp chiến lược toàn diện.
              </p>
              <p className="text-[1.05rem] leading-[1.8]" style={{ color: '#6B6560' }}>
                Với đội ngũ chuyên gia giàu kinh nghiệm thực tiễn, MIG liên tục đổi mới phương pháp luận để bắt kịp xu hướng công nghệ, giúp khách hàng tối ưu hóa quy trình, nâng tầm thương hiệu và đạt được sự tăng trưởng vượt bậc trong kỷ nguyên số.
              </p>
            </div>

            {/* Pillar Chips */}
            <div className="about-text-anim about-anim flex flex-wrap gap-3" aria-label="Giá trị cốt lõi">
              {['Chính trực', 'Sáng tạo', 'Bền vững', 'Đối tác'].map((label) => (
                <span
                  key={label}
                  className="inline-flex items-center justify-center rounded-sm px-5 py-2.5 text-sm font-medium transition-colors"
                  style={{ background: 'rgba(200,169,110,0.1)', color: '#1A1712', border: '1px solid rgba(200,169,110,0.2)' }}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
