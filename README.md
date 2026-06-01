# MIG Technology Website

> **Giải pháp Công Nghệ Điện Tử Chuyên Nghiệp** – Website chính thức của Công ty TNHH Công Nghệ MIG.

[![GitHub](https://img.shields.io/badge/GitHub-Sangbeo113%2FMIG--blue?logo=github)](https://github.com/Sangbeo113/MIG-)

## 🌐 Xem Trực Tiếp

Chạy local server để xem website:
```bash
npx serve migtech.vn -l 3000
```
Sau đó mở: `http://localhost:3000`

---

## 📁 Cấu Trúc Thư Mục

```
migtech.vn/
├── index.html                    # Trang chủ (Raycast-inspired, Tailwind CSS)
├── index-legacy.html             # Backup trang chủ cũ
├── gioi-thieu.html               # Trang giới thiệu
├── lien-he.html                  # Trang liên hệ
├── chinh-sach.html               # Chính sách
│
├── dich-vu/                      # Nhóm trang Dịch vụ
│   ├── thi-cong-bao-tri-led/
│   │   └── index.html            # ✅ Pilot A – Template Dịch vụ
│   ├── sua-chua-thiet-bi.html
│   ├── thiet-ke-theo-yeu-cau.html
│   └── cung-ung-thiet-bi.html
│
├── tin-tuc/                      # Nhóm trang Tin tức
│   ├── tat-ca-bai-viet.html      # ✅ Pilot C – Template Listing
│   ├── thi-cong-bao-tri-led.html
│   ├── sua-chua-thiet-bi.html
│   └── nhap-khau-thiet-bi.html
│
├── du-an.html                    # Trang dự án
│
├── partials/                     # 🧩 Shared Components
│   ├── navbar.html               # Navbar dùng chung toàn site
│   └── footer.html               # Footer dùng chung toàn site
│
├── script/
│   ├── core/
│   │   ├── component-loader.js   # Component Loader (nạp partials qua Fetch API)
│   │   └── extract-base64-images.js  # Utility: tách ảnh Base64 từ HTML
│   └── shop/
│       └── gsap-animations.js    # Hệ thống GSAP animations
│
├── css/
│   └── main.css                  # Legacy CSS (chỉ dùng cho các trang chưa migrate)
│
├── legacy/                       # 🗄️ Scripts cũ đã bị thay thế
│   ├── home.js
│   └── banner-script.js
│
├── images/                       # Thư mục ảnh
│   ├── lankmark/                 # Ảnh dự án Landmark 81
│   ├── test/                     # Ảnh thiết bị kiểm tra
│   ├── service/                  # Ảnh dịch vụ
│   ├── subnav/                   # Ảnh subnav dropdown (legacy)
│   ├── icon/                     # Icons (Zalo, phone)
│   └── ...
│
└── uploads/                      # Ảnh upload từ CMS
    └── images/
        ├── logos/                # Logo MIG Technology
        └── home-images/          # Ảnh giới thiệu công ty
```

---

## 🧩 Hệ Thống Component Loader

Navbar và Footer được tách thành file HTML riêng trong thư mục `partials/` và nạp vào mỗi trang qua **Fetch API** để tránh lặp code.

### Cách Sử Dụng

**Trang ở root level** (`gioi-thieu.html`, `lien-he.html`...):
```html
<!-- Trong <body>, ngay sau <body> tag -->
<div data-include="partials/navbar.html"></div>

<!-- Cuối body, trước </body> -->
<div data-include="partials/footer.html"></div>
```

**Trang trong thư mục con** (`dich-vu/`, `tin-tuc/`...):
```html
<div data-include="partials/navbar.html" data-base=".."></div>
<!-- ... page content ... -->
<div data-include="partials/footer.html" data-base=".."></div>
```

**Script phải được nhúng trước GSAP:**
```html
<script src="script/core/component-loader.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="script/shop/gsap-animations.js"></script>
```

> ⚠️ **Lưu ý:** Component Loader sử dụng Fetch API, do đó trang phải được phục vụ qua HTTP server (không mở file trực tiếp từ trình duyệt). Dùng `npx serve migtech.vn` hoặc bất kỳ web server nào để test local.

---

## ✨ Thêm Trang Mới

### 1. Tạo file HTML mới
Sao chép template từ một trong 3 Pilot Pages tùy nhóm:

| Nhóm | Pilot | Dùng khi |
|---|---|---|
| **Template A** – Dịch vụ | `dich-vu/thi-cong-bao-tri-led/index.html` | Trang dịch vụ, giải pháp |
| **Template B** – Thông tin | `gioi-thieu.html` | Về công ty, chính sách, liên hệ |
| **Template C** – Listing | `tin-tuc/tat-ca-bai-viet.html` | Danh sách bài viết, dự án |

### 2. Điều chỉnh đường dẫn
- **Root level:** Không cần `data-base`, dùng path bình thường (`images/...`, `script/...`)
- **Thư mục con:** Thêm `data-base=".."`, prefix tất cả paths bằng `../`

### 3. Cập nhật meta tags
```html
<title>Tên Trang – MIG Technology</title>
<meta name="description" content="Mô tả ngắn 150-160 ký tự..." />
<meta property="og:title" content="Tên Trang – MIG Technology" />
<meta property="og:description" content="Mô tả..." />
<meta property="og:url" content="https://migtech.vn/path-to-page" />
```

### 4. Cập nhật link navbar active
Component Loader v2 **tự động** đánh dấu link active dựa vào URL hiện tại. Không cần thêm class `active` thủ công.

---

## 🎨 Design System

### Glassmorphism Classes
| Class | Dùng khi |
|---|---|
| `.glass` | Element phụ, badge |
| `.glass-card` | Cards, panels (blur tự động scale theo screen) |
| `.glass-strong` | Navbar, dropdown panels |

### Buttons
```html
<a href="#" class="btn-primary text-white px-6 py-3 rounded-xl">Primary</a>
<a href="#" class="btn-outline text-gray-700 px-6 py-3 rounded-xl">Outline</a>
```

### Scroll Animations
Thêm class `.reveal` vào element muốn có hiệu ứng fade-up khi scroll vào viewport:
```html
<div class="reveal">Nội dung sẽ xuất hiện khi scroll</div>
```

### Gradient Text
```html
<span class="gradient-text">Text màu gradient MIG Blue</span>
```

---

## 🛠️ Công Cụ Hữu Ích

### Tách Ảnh Base64 (cho file HTML nặng)
```bash
node migtech.vn/script/core/extract-base64-images.js \
  migtech.vn/du-an.html \
  migtech.vn/images/projects \
  migtech.vn/du-an.html
```

---

## 🚀 Công Nghệ Sử Dụng

| Công nghệ | Phiên bản | Mục đích |
|---|---|---|
| Tailwind CSS | CDN 3.x | Styling framework |
| GSAP | 3.12.5 | Animations & ScrollTrigger |
| Inter | Google Fonts | Typography |
| Font Awesome | 6.5.2 | Icons |
| Fetch API | Native | Component loading |

---

## 📝 Lịch Sử Phiên Bản

| Commit | Mô tả |
|---|---|
| `feat: snapshot prototype` | Prototype trang chủ Raycast-inspired ban đầu |
| `refactor: componentize` | Tách Navbar/Footer thành partials, migrate `index.html` |
| *(tiếp theo)* | Phủ sóng 11 trang con + tối ưu SEO/Performance |

---

## 📞 Thông Tin Liên Hệ

**Công ty TNHH Công Nghệ MIG**  
📍 181 Đường số 20, P.5, Q. Gò Vấp, TP.HCM  
📞 0971.73.15.18 | 0902.03.85.79  
✉️ Congnghemig@gmail.com  
🌐 [migtech.vn](https://migtech.vn)
