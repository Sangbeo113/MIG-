import { useRef, useState, type FormEvent, type FocusEvent } from 'react'
import { useScrollRevealLeft, useScrollRevealRight } from '@/hooks/useGSAP'
import { gsap } from '@/lib/gsap-config'
import { CONTACT_INFO, SOCIAL_LINKS } from '@/lib/constants'
import { trackContactFormStart, trackContactFormSubmit } from '@/lib/analytics'

// Define form fields
type FormState = {
  name: string
  email: string
  phone: string
  company: string
  service: string
  message: string
  consent: boolean
}

type FormErrors = Partial<Record<keyof FormState, string>>

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const successRef = useRef<HTMLDivElement>(null)

  const [form, setForm] = useState<FormState>({
    name: '', email: '', phone: '', company: '', service: 'Tư vấn chiến lược', message: '', consent: false
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const leftColRef = useRef<HTMLDivElement>(null)
  const rightColRef = useRef<HTMLDivElement>(null)

  useScrollRevealLeft(leftColRef)
  useScrollRevealRight(rightColRef)

  // Validation logic
  const validateField = (name: keyof FormState, value: string | boolean): string => {
    switch (name) {
      case 'name':
        return !value ? 'Vui lòng nhập họ và tên.' : ''
      case 'email':
        if (!value) return 'Vui lòng nhập email.'
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value as string) ? '' : 'Email không hợp lệ.'
      case 'phone':
        if (!value) return '' // optional, but if entered validate
        return /^(0|\+84)[3|5|7|8|9][0-9]{8}$/.test((value as string).replace(/\s/g, '')) ? '' : 'Số điện thoại không hợp lệ (10 số).'
      case 'message':
        return !value ? 'Vui lòng nhập nội dung cần tư vấn.' : ''
      case 'consent':
        return !value ? 'Bạn cần đồng ý với chính sách bảo mật.' : ''
      default:
        return ''
    }
  }

  const handleBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    
    setTouched(prev => ({ ...prev, [name]: true }))
    setErrors(prev => ({ ...prev, [name]: validateField(name as keyof FormState, val) }))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    
    setForm(prev => ({ ...prev, [name]: val }))
    if (touched[name as keyof FormState]) {
      setErrors(prev => ({ ...prev, [name]: validateField(name as keyof FormState, val) }))
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    // Validate all
    const newErrors: FormErrors = {}
    let isValid = true
    ;(Object.keys(form) as Array<keyof FormState>).forEach(key => {
      const err = validateField(key, form[key])
      if (err) {
        newErrors[key] = err
        isValid = false
      }
      touched[key] = true
    })

    setErrors(newErrors)
    setTouched(touched)

    if (!isValid) return

    setStatus('sending')
    trackContactFormSubmit()
    
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // GSAP Transition to success message
    if (formRef.current && successRef.current) {
      gsap.to(formRef.current, { 
        opacity: 0, duration: 0.4, 
        onComplete: () => {
          gsap.set(formRef.current, { display: 'none' })
          gsap.set(successRef.current, { display: 'flex' })
          gsap.fromTo(successRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 })
          setStatus('sent')
        }
      })
    }
  }

  const getInputBorder = (name: keyof FormState) => {
    if (errors[name] && touched[name]) return 'border-red-500'
    if (!errors[name] && touched[name] && form[name]) return 'border-green-500/50'
    return 'border-white/10'
  }

  return (
    <section
      id="lien-he"
      ref={sectionRef}
      aria-labelledby="contact-heading"
      className="py-24 md:py-32 bg-[#0F0E0C]"
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          <div ref={leftColRef} className="contact-anim opacity-0">
            <h2
              id="contact-heading"
              className="font-normal mb-6 text-white"
              style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', lineHeight: 1.15, letterSpacing: '-0.02em' }}
            >
              Hãy bắt đầu <br className="hidden lg:block"/>
              <em style={{ color: '#C8A96E', fontStyle: 'italic' }}>cuộc trò chuyện</em>
            </h2>
            <p className="text-white/60 mb-12 text-[1.05rem] leading-relaxed">
              Mọi giải pháp lớn đều bắt đầu từ một cuộc trao đổi. Hãy để đội ngũ chuyên gia của MIG lắng nghe và đồng hành cùng sự phát triển của doanh nghiệp bạn.
            </p>

            <ul className="space-y-6 mb-12" role="list">
              <li className="flex items-start gap-4">
                <span className="text-[#C8A96E] mt-1" aria-hidden="true">✉</span>
                <div>
                  <p className="text-[0.7rem] font-semibold tracking-widest uppercase text-white/40 mb-1">Email</p>
                  <a href={`mailto:${CONTACT_INFO.email}`} className="text-white/80 hover:text-[#C8A96E] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C8A96E] rounded-sm">
                    {CONTACT_INFO.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-[#C8A96E] mt-1" aria-hidden="true">☎</span>
                <div>
                  <p className="text-[0.7rem] font-semibold tracking-widest uppercase text-white/40 mb-1">Điện thoại</p>
                  <div className="flex flex-col gap-1">
                    {CONTACT_INFO.phone.map(p => (
                      <a key={p} href={`tel:${p.replace(/\s/g, '')}`} className="text-white/80 hover:text-[#C8A96E] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C8A96E] rounded-sm">
                        {p}
                      </a>
                    ))}
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-[#C8A96E] mt-1" aria-hidden="true">⌖</span>
                <div>
                  <p className="text-[0.7rem] font-semibold tracking-widest uppercase text-white/40 mb-1">Địa chỉ</p>
                  <p className="text-white/80">{CONTACT_INFO.address}</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-[#C8A96E] mt-1" aria-hidden="true">◷</span>
                <div>
                  <p className="text-[0.7rem] font-semibold tracking-widest uppercase text-white/40 mb-1">Giờ làm việc</p>
                  <p className="text-white/80">{CONTACT_INFO.workHours}</p>
                </div>
              </li>
            </ul>

            <div className="flex gap-3 flex-wrap" aria-label="Mạng xã hội">
              {SOCIAL_LINKS.map(link => (
                <a 
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-colors focus:outline-none focus:ring-2 focus:ring-[#C8A96E]"
                  style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.7)' }}
                  onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(200,169,110,0.15)'; e.currentTarget.style.color = '#C8A96E' }}
                  onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)' }}
                  aria-label={link.ariaLabel}
                >
                  {link.platform}
                </a>
              ))}
            </div>

            {/* Google Maps Embed */}
            <div className="mt-12 w-full h-[250px] md:h-[350px] bg-white/5 rounded-sm overflow-hidden relative" aria-hidden="true">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.424167419736!2d106.69835847585473!3d10.778788659149022!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f48a3b04c8f%3A0xc3b5ed7f5a9e701a!2sNotre%20Dame%20Cathedral%20of%20Saigon!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s" 
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: 'grayscale(100%) invert(90%) contrast(80%)' }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Bản đồ vị trí MIG"
                aria-hidden="true"
              />
            </div>
          </div>

          <div ref={rightColRef} className="contact-anim opacity-0">
            {/* Success Message (hidden initially) */}
            <div 
              ref={successRef} 
              className="hidden flex-col items-center justify-center text-center p-12 h-full rounded-sm border border-[#C8A96E]/20 bg-[#C8A96E]/5"
              role="status"
              aria-live="polite"
            >
              <div className="w-16 h-16 rounded-full border-2 border-[#C8A96E] flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#C8A96E]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
              </div>
              <h3 className="text-2xl font-normal text-white mb-3" style={{ fontFamily: 'var(--font-display)' }}>Gửi thành công!</h3>
              <p className="text-white/60">Cảm ơn bạn đã liên hệ. Đội ngũ MIG sẽ phản hồi trong vòng 24 giờ làm việc.</p>
            </div>

            <form 
              ref={formRef}
              onSubmit={handleSubmit} 
              className="space-y-6" 
              aria-label="Biểu mẫu liên hệ MIG"
              noValidate
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-[0.7rem] font-semibold tracking-widest uppercase text-[#C8A96E] mb-2">Họ và tên *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={() => { if (!form.name && !form.email) trackContactFormStart() }}
                    required
                    aria-required="true"
                    aria-invalid={!!(errors.name && touched.name)}
                    aria-describedby={errors.name && touched.name ? "name-error" : undefined}
                    className={`w-full bg-white/5 border ${getInputBorder('name')} rounded-sm px-4 py-3 text-white focus:outline-none focus:border-[#C8A96E] transition-colors`}
                  />
                  {errors.name && touched.name && <p id="name-error" role="alert" className="text-red-400 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-[0.7rem] font-semibold tracking-widest uppercase text-[#C8A96E] mb-2">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    aria-required="true"
                    aria-invalid={!!(errors.email && touched.email)}
                    aria-describedby={errors.email && touched.email ? "email-error" : undefined}
                    className={`w-full bg-white/5 border ${getInputBorder('email')} rounded-sm px-4 py-3 text-white focus:outline-none focus:border-[#C8A96E] transition-colors`}
                  />
                  {errors.email && touched.email && <p id="email-error" role="alert" className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-[0.7rem] font-semibold tracking-widest uppercase text-[#C8A96E] mb-2">Số điện thoại</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={!!(errors.phone && touched.phone)}
                    aria-describedby={errors.phone && touched.phone ? "phone-error" : undefined}
                    className={`w-full bg-white/5 border ${getInputBorder('phone')} rounded-sm px-4 py-3 text-white focus:outline-none focus:border-[#C8A96E] transition-colors`}
                  />
                  {errors.phone && touched.phone && <p id="phone-error" role="alert" className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <label htmlFor="company" className="block text-[0.7rem] font-semibold tracking-widest uppercase text-[#C8A96E] mb-2">Doanh nghiệp</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-[#C8A96E] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="service" className="block text-[0.7rem] font-semibold tracking-widest uppercase text-[#C8A96E] mb-2">Nhu cầu tư vấn</label>
                <select
                  id="service"
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-[#C8A96E] transition-colors appearance-none"
                  style={{ backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23C8A96E' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1em' }}
                >
                  <option className="bg-[#1A1712] text-white">Tư vấn chiến lược</option>
                  <option className="bg-[#1A1712] text-white">Công nghệ số</option>
                  <option className="bg-[#1A1712] text-white">Phát triển thương hiệu</option>
                  <option className="bg-[#1A1712] text-white">Quản lý dự án</option>
                  <option className="bg-[#1A1712] text-white">Khác</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-[0.7rem] font-semibold tracking-widest uppercase text-[#C8A96E] mb-2">Nội dung *</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  aria-required="true"
                  aria-invalid={!!(errors.message && touched.message)}
                  aria-describedby={errors.message && touched.message ? "message-error" : undefined}
                  className={`w-full bg-white/5 border ${getInputBorder('message')} rounded-sm px-4 py-3 text-white focus:outline-none focus:border-[#C8A96E] transition-colors resize-y`}
                />
                {errors.message && touched.message && <p id="message-error" role="alert" className="text-red-400 text-xs mt-1">{errors.message}</p>}
              </div>

              <div>
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center mt-0.5">
                    <input
                      type="checkbox"
                      name="consent"
                      checked={form.consent}
                      onChange={handleChange}
                      onBlur={() => setTouched(prev => ({ ...prev, consent: true }))}
                      className="sr-only"
                      aria-required="true"
                      aria-invalid={!!(errors.consent && touched.consent)}
                    />
                    <div className={`w-5 h-5 rounded-sm border transition-colors flex items-center justify-center ${form.consent ? 'bg-[#C8A96E] border-[#C8A96E]' : 'border-white/20 group-hover:border-[#C8A96E]/50 focus-within:ring-2 focus-within:ring-[#C8A96E] focus-within:ring-offset-2 focus-within:ring-offset-[#0F0E0C]'}`}>
                      {form.consent && <svg className="w-3.5 h-3.5 text-[#0F0E0C]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>}
                    </div>
                  </div>
                  <span className="text-sm text-white/60">
                    Tôi đồng ý với <a href="#" className="text-[#C8A96E] hover:underline focus:outline-none focus:ring-1 focus:ring-[#C8A96E]">Chính sách bảo mật</a> và cho phép MIG xử lý dữ liệu để liên hệ.
                  </span>
                </label>
                {errors.consent && touched.consent && <p role="alert" className="text-red-400 text-xs mt-1 ml-8">{errors.consent}</p>}
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full sm:w-auto rounded-sm px-8 py-4 text-sm font-semibold transition-all hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#0F0E0C] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                style={{ background: '#C8A96E', color: '#0F0E0C' }}
              >
                {status === 'sending' ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Đang xử lý...
                  </>
                ) : 'Gửi yêu cầu'}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  )
}
