/**
 * Google Analytics 4 Tracking Wrapper
 */

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID


export const trackEvent = (category: string, action: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value
    })
  } else {
    console.debug(`[GA Event Tracked]: ${category} / ${action} / ${label} / ${value}`)
  }
}

export const trackPageView = (page: string) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: page
    })
  }
}

export const trackContactFormStart = () => {
  trackEvent('Contact', 'form_start', 'Liên Hệ Form')
}

export const trackContactFormSubmit = () => {
  trackEvent('Contact', 'form_submit', 'Liên Hệ Form Thành Công')
}

export const trackCTAClick = (ctaName: string, location: string) => {
  trackEvent('CTA', 'click', `${ctaName}_${location}`)
}

export const trackServiceCardClick = (serviceName: string) => {
  trackEvent('Service', 'click', serviceName)
}
