// ─── Domain Types ─────────────────────────────────────────────────────────────

export interface NavItem {
  id: string
  label: string
  href: string
  ariaLabel: string
}

export interface ServiceFeature {
  text: string
}

export interface Service {
  id: string
  icon: string          // lucide icon name or emoji fallback
  title: string
  shortDesc: string
  fullDesc: string
  features: string[]
}

export interface ValueStat {
  number: string
  label: string
  sublabel: string
  description: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  initials: string
  linkedIn?: string
}

export interface ContactInfo {
  email: string
  phone: string[]
  address: string
  workHours: string
  mapEmbed?: string
}

export interface SocialLink {
  platform: string
  url: string
  ariaLabel: string
  icon: string
}

export interface SeoMeta {
  siteName: string
  defaultTitle: string
  defaultDesc: string
  ogImage: string
  twitterCard: 'summary' | 'summary_large_image'
}

export interface CompanyInfo {
  founded: number
  tagline: string
  mission: string
  vision: string
}

// ─── GSAP / Animation Types ────────────────────────────────────────────────────

export interface ScrollTriggerOptions {
  start?: string
  end?: string
  scrub?: boolean | number
  pin?: boolean
  markers?: boolean
  toggleActions?: string
}

export interface AnimationConfig {
  duration?: number
  delay?: number
  ease?: string
  stagger?: number
}

// ─── UI Component Props ────────────────────────────────────────────────────────

export interface SectionProps {
  id?: string
  className?: string
}

export interface ButtonVariant {
  variant: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}
