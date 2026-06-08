import { NAV_ITEMS, CONTACT_INFO, SOCIAL_LINKS, COMPANY_INFO } from '@/lib/constants'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      role="contentinfo"
      className="text-white"
      style={{ background: '#0F0E0C', borderTop: '1px solid rgba(255,255,255,0.08)' }}
    >
      <div className="max-w-[1200px] mx-auto px-10 pt-20 pb-10">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">

          {/* Brand column */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span
                className="w-9 h-9 flex items-center justify-center rounded-sm text-[#0F0E0C] text-xl font-semibold"
                style={{ background: '#C8A96E', fontFamily: 'var(--font-display)' }}
              >
                M
              </span>
              <span
                className="text-white text-2xl font-semibold tracking-widest"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                MIG
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-[260px]">
              {COMPANY_INFO.mission}
            </p>
            {/* Social links */}
            <div className="flex gap-4" role="list" aria-label="Mạng xã hội">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.ariaLabel}
                  className="text-white/50 hover:text-[#C8A96E] transition-colors duration-200 text-sm"
                  role="listitem"
                >
                  {link.platform}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation column */}
          <nav aria-label="Điều hướng footer">
            <h3
              className="text-[0.72rem] font-semibold tracking-[0.2em] uppercase mb-6"
              style={{ color: '#C8A96E' }}
            >
              Điều hướng
            </h3>
            <ul className="flex flex-col gap-3" role="list">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    aria-label={item.ariaLabel}
                    className="text-white/60 hover:text-white text-sm transition-colors duration-200"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact column */}
          <address className="not-italic">
            <h3
              className="text-[0.72rem] font-semibold tracking-[0.2em] uppercase mb-6"
              style={{ color: '#C8A96E' }}
            >
              Liên hệ
            </h3>
            <ul className="flex flex-col gap-3 text-white/60 text-sm" role="list">
              <li>
                <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-[#C8A96E] transition-colors duration-200">
                  {CONTACT_INFO.email}
                </a>
              </li>
              {CONTACT_INFO.phone.map((p) => (
                <li key={p}>
                  <a href={`tel:${p.replace(/\s/g, '')}`} className="hover:text-[#C8A96E] transition-colors duration-200">
                    {p}
                  </a>
                </li>
              ))}
              <li className="leading-relaxed">{CONTACT_INFO.address}</li>
              <li className="text-white/40">{CONTACT_INFO.workHours}</li>
            </ul>
          </address>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs text-white/30"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
        >
          <p>© {year} MIG Corporation. Bảo lưu mọi quyền.</p>
          <p>Thành lập năm {COMPANY_INFO.founded} · TP. Hồ Chí Minh, Việt Nam</p>
        </div>
      </div>
    </footer>
  )
}
