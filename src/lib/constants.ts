import type {
  NavItem,
  Service,
  ValueStat,
  TeamMember,
  ContactInfo,
  SocialLink,
  SeoMeta,
  CompanyInfo,
} from '@/types'

// ─── Navigation ────────────────────────────────────────────────────────────────

export const NAV_ITEMS: NavItem[] = [
  {
    id: 'about',
    label: 'Về chúng tôi',
    href: '#ve-chung-toi',
    ariaLabel: 'Chuyển đến phần Về chúng tôi',
  },
  {
    id: 'services',
    label: 'Dịch vụ',
    href: '#dich-vu',
    ariaLabel: 'Chuyển đến phần Dịch vụ',
  },
  {
    id: 'values',
    label: 'Giá trị',
    href: '#gia-tri',
    ariaLabel: 'Chuyển đến phần Giá trị cốt lõi',
  },
  {
    id: 'team',
    label: 'Đội ngũ',
    href: '#doi-ngu',
    ariaLabel: 'Chuyển đến phần Đội ngũ lãnh đạo',
  },
  {
    id: 'contact',
    label: 'Liên hệ',
    href: '#lien-he',
    ariaLabel: 'Chuyển đến phần Liên hệ',
  },
]

// ─── Services ──────────────────────────────────────────────────────────────────

export const SERVICES: Service[] = [
  {
    id: 'tu-van-chien-luoc',
    icon: '◈',
    title: 'Tư Vấn Chiến Lược',
    shortDesc: 'Định hướng phát triển bền vững cho doanh nghiệp của bạn.',
    fullDesc:
      'Chúng tôi phân tích toàn diện thị trường, đối thủ cạnh tranh và nội lực doanh nghiệp để xây dựng lộ trình chiến lược phù hợp. Mỗi giải pháp được cá nhân hóa dựa trên dữ liệu thực tiễn và tầm nhìn dài hạn. Đội ngũ tư vấn cấp cao của MIG đồng hành cùng bạn từ giai đoạn hoạch định đến triển khai.',
    features: [
      'Phân tích SWOT và mô hình kinh doanh chuyên sâu',
      'Xây dựng lộ trình chiến lược 3–5 năm',
      'Tư vấn M&A và tái cấu trúc tổ chức',
      'Đánh giá hiệu suất và KPI theo quý',
    ],
  },
  {
    id: 'giai-phap-cong-nghe',
    icon: '◎',
    title: 'Giải Pháp Công Nghệ',
    shortDesc: 'Chuyển đổi số toàn diện – từ hạ tầng đến trải nghiệm người dùng.',
    fullDesc:
      'MIG triển khai các giải pháp công nghệ tiên tiến giúp doanh nghiệp tối ưu vận hành và nâng cao năng lực cạnh tranh trong kỷ nguyên số. Chúng tôi tích hợp AI, cloud và automation vào quy trình kinh doanh một cách liền mạch. Cam kết bảo mật dữ liệu và hiệu suất hệ thống đạt chuẩn quốc tế.',
    features: [
      'Tư vấn và triển khai chuyển đổi số toàn diện',
      'Phát triển phần mềm doanh nghiệp theo yêu cầu',
      'Tích hợp AI và tự động hóa quy trình (RPA)',
      'Bảo mật thông tin và quản lý hạ tầng đám mây',
    ],
  },
  {
    id: 'phat-trien-thuong-hieu',
    icon: '◇',
    title: 'Phát Triển Thương Hiệu',
    shortDesc: 'Xây dựng bản sắc thương hiệu mạnh mẽ và nhất quán.',
    fullDesc:
      'Thương hiệu là tài sản vô hình quý giá nhất của doanh nghiệp. MIG giúp bạn định hình câu chuyện thương hiệu, thiết kế bộ nhận diện chuyên nghiệp và triển khai chiến lược truyền thông đa kênh hiệu quả. Mỗi điểm chạm thương hiệu được chăm chút để tạo ấn tượng sâu sắc với khách hàng mục tiêu.',
    features: [
      'Nghiên cứu và định vị thương hiệu chiến lược',
      'Thiết kế bộ nhận diện thương hiệu (Brand Identity)',
      'Xây dựng nội dung và chiến lược truyền thông',
      'Quản lý danh tiếng và quan hệ công chúng',
    ],
  },
  {
    id: 'quan-ly-du-an',
    icon: '◉',
    title: 'Quản Lý Dự Án',
    shortDesc: 'Đảm bảo tiến độ, chất lượng và hiệu quả đầu tư tối ưu.',
    fullDesc:
      'Với phương pháp quản lý dự án chuẩn quốc tế (PMI/Agile), MIG giúp doanh nghiệp kiểm soát rủi ro và tối ưu nguồn lực trong mọi giai đoạn dự án. Chúng tôi cung cấp PMO chuyên nghiệp, dashboards theo dõi thời gian thực và báo cáo minh bạch định kỳ. Tỷ lệ dự án hoàn thành đúng tiến độ của MIG đạt trên 95%.',
    features: [
      'Quản lý dự án theo chuẩn PMI và Agile/Scrum',
      'Thiết lập PMO và quy trình kiểm soát chất lượng',
      'Báo cáo tiến độ và dashboard thời gian thực',
      'Quản lý rủi ro và tối ưu hóa nguồn lực',
    ],
  },
]

// ─── Value Stats ───────────────────────────────────────────────────────────────

export const VALUES: ValueStat[] = [
  {
    number: '200+',
    label: 'Khách Hàng',
    sublabel: 'Doanh nghiệp tin tưởng',
    description:
      'Hơn 200 doanh nghiệp B2B hàng đầu tại Việt Nam và khu vực Đông Nam Á đã đồng hành cùng MIG.',
  },
  {
    number: '15+',
    label: 'Năm Kinh Nghiệm',
    sublabel: 'Trong ngành tư vấn B2B',
    description:
      'Hơn 15 năm tích lũy kinh nghiệm thực tiễn trong các ngành tài chính, bán lẻ, sản xuất và công nghệ.',
  },
  {
    number: '98%',
    label: 'Hài Lòng',
    sublabel: 'Tỷ lệ khách hàng hài lòng',
    description:
      'Chỉ số hài lòng khách hàng (CSAT) của MIG duy trì ổn định trên 98% trong 5 năm liên tiếp.',
  },
  {
    number: '50+',
    label: 'Chuyên Gia',
    sublabel: 'Nhân sự cấp cao',
    description:
      'Đội ngũ hơn 50 chuyên gia có bằng cấp quốc tế và kinh nghiệm làm việc tại các tập đoàn toàn cầu.',
  },
]

// ─── Team Members ──────────────────────────────────────────────────────────────

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'ceo',
    name: 'Nguyễn Minh Tuấn',
    role: 'Tổng Giám Đốc (CEO)',
    bio: 'Hơn 20 năm kinh nghiệm lãnh đạo trong lĩnh vực tư vấn chiến lược và quản trị doanh nghiệp. Tốt nghiệp MBA tại INSEAD và từng đảm nhiệm vị trí Giám đốc Điều hành tại McKinsey & Company Việt Nam.',
    initials: 'NT',
    linkedIn: 'https://linkedin.com/in/nguyen-minh-tuan-mig',
  },
  {
    id: 'cso',
    name: 'Trần Thị Lan Anh',
    role: 'Giám Đốc Chiến Lược (CSO)',
    bio: 'Chuyên gia hàng đầu về phân tích thị trường và hoạch định chiến lược kinh doanh. Với 15 năm kinh nghiệm, bà đã tư vấn thành công cho hơn 80 dự án chuyển đổi tổ chức quy mô lớn.',
    initials: 'LA',
    linkedIn: 'https://linkedin.com/in/tran-lan-anh-mig',
  },
  {
    id: 'cto',
    name: 'Phạm Quốc Hùng',
    role: 'Giám Đốc Công Nghệ (CTO)',
    bio: 'Tiến sĩ Khoa học Máy tính tại Đại học Tokyo. Chuyên gia về AI, cloud computing và chuyển đổi số doanh nghiệp với hơn 12 năm kinh nghiệm tại Google và Microsoft Việt Nam.',
    initials: 'QH',
    linkedIn: 'https://linkedin.com/in/pham-quoc-hung-mig',
  },
  {
    id: 'cco',
    name: 'Lê Thị Hương Giang',
    role: 'Giám Đốc Sáng Tạo (CCO)',
    bio: 'Nhà thiết kế thương hiệu và chuyên gia truyền thông với hơn 10 năm xây dựng bản sắc cho các thương hiệu lớn tại Việt Nam và khu vực. Tốt nghiệp Thiết kế Đồ họa tại Parsons School of Design, New York.',
    initials: 'HG',
    linkedIn: 'https://linkedin.com/in/le-huong-giang-mig',
  },
]

// ─── Contact Info ──────────────────────────────────────────────────────────────

export const CONTACT_INFO: ContactInfo = {
  email: 'hello@migcorp.vn',
  phone: ['0971 731 518', '0902 038 579'],
  address: '181 Đường Số 20, Phường 5, Quận Gò Vấp, TP. Hồ Chí Minh',
  workHours: 'Thứ Hai – Thứ Sáu: 08:00 – 17:30',
  mapEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.7!2d106.67!3d10.84!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDUwJzI0LjAiTiAxMDbCsDQwJzEyLjAiRQ!5e0!3m2!1svi!2svn!4v1620000000000!5m2!1svi!2svn',
}

// ─── Social Links ──────────────────────────────────────────────────────────────

export const SOCIAL_LINKS: SocialLink[] = [
  {
    platform: 'Facebook',
    url: 'https://facebook.com/migcorp.vn',
    ariaLabel: 'Trang Facebook của MIG Corporation',
    icon: 'facebook',
  },
  {
    platform: 'LinkedIn',
    url: 'https://linkedin.com/company/mig-corporation-vietnam',
    ariaLabel: 'Trang LinkedIn của MIG Corporation',
    icon: 'linkedin',
  },
  {
    platform: 'Zalo OA',
    url: 'https://zalo.me/migcorp',
    ariaLabel: 'Trang Zalo Official Account của MIG Corporation',
    icon: 'zalo',
  },
]

// ─── SEO Meta ─────────────────────────────────────────────────────────────────

export const SEO_META: SeoMeta = {
  siteName: 'MIG Corporation',
  defaultTitle: 'MIG – Kiến Tạo Giá Trị Bền Vững | Tư vấn Chiến lược & Công nghệ B2B',
  defaultDesc:
    'MIG Corporation – Đối tác chiến lược tin cậy tại Việt Nam. Chuyên tư vấn chiến lược, giải pháp công nghệ, phát triển thương hiệu và quản lý dự án cho doanh nghiệp B2B.',
  ogImage: 'https://migtech.vn/public/brand/og-image.png',
  twitterCard: 'summary_large_image',
}

// ─── Company Info ─────────────────────────────────────────────────────────────

export const COMPANY_INFO: CompanyInfo = {
  founded: 2009,
  tagline: 'Kiến Tạo Giá Trị Bền Vững',
  mission:
    'Đồng hành cùng doanh nghiệp Việt Nam kiến tạo giá trị bền vững thông qua tư vấn chiến lược, công nghệ tiên tiến và đội ngũ chuyên gia tận tâm.',
  vision:
    'Trở thành công ty tư vấn chiến lược và công nghệ B2B hàng đầu Đông Nam Á vào năm 2030, góp phần nâng tầm năng lực cạnh tranh của doanh nghiệp Việt Nam trên trường quốc tế.',
}
