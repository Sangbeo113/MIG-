import { Helmet } from 'react-helmet-async'
import { CONTACT_INFO, SOCIAL_LINKS } from '@/lib/constants'

interface SEOHeadProps {
  title?: string
  description?: string
  keywords?: string
  ogImage?: string
  canonical?: string
}

export default function SEOHead({
  title = 'MIG – Kiến Tạo Giá Trị Bền Vững',
  description = 'MIG Corporation – Đối tác chiến lược tin cậy tại Việt Nam. Chuyên tư vấn chiến lược, giải pháp công nghệ, phát triển thương hiệu và quản lý dự án cho doanh nghiệp B2B.',
  keywords = 'MIG, MIG Corporation, tư vấn chiến lược, công nghệ số, B2B Việt Nam',
  ogImage = 'https://migtech.vn/public/brand/og-image.png',
  canonical = 'https://migtech.vn'
}: SEOHeadProps) {
  
  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "MIG Corporation",
    "url": "https://migtech.vn",
    "logo": "https://migtech.vn/public/brand/apple-touch-icon.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": CONTACT_INFO.phone[0].replace(/\s/g, ''),
      "contactType": "customer service",
      "email": CONTACT_INFO.email,
      "areaServed": "VN",
      "availableLanguage": "Vietnamese"
    },
    "sameAs": SOCIAL_LINKS.map(link => link.url)
  }

  // LocalBusiness Schema
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "MIG Corporation",
    "image": "https://migtech.vn/public/brand/og-image.png",
    "url": "https://migtech.vn",
    "telephone": CONTACT_INFO.phone[0],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": CONTACT_INFO.address.split(',')[0],
      "addressLocality": "Ho Chi Minh City",
      "addressCountry": "VN"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    }
  }

  return (
    <Helmet>
      {/* Basic Metadata */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonical} />

      {/* OpenGraph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="vi_VN" />
      <meta property="og:site_name" content="MIG Corporation" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>
    </Helmet>
  )
}
