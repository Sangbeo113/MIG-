# MIG Corporation Website

MIG Corporation – Đối tác chiến lược tin cậy tại Việt Nam. Website doanh nghiệp B2B với thiết kế sang trọng, tối giản, tương tác GSAP mượt mà và tối ưu hóa SEO.

## Setup & Development

1. **Clone repository:**
   ```bash
   git clone <repository-url>
   cd mig-production
   ```

2. **Cài đặt thư viện:**
   ```bash
   npm install
   ```

3. **Cấu hình biến môi trường:**
   Copy file `.env.example` thành `.env` và điền các thông tin của bạn:
   ```bash
   cp .env.example .env
   ```

4. **Chạy Development Server:**
   ```bash
   npm run dev
   ```

5. **Build cho Production:**
   ```bash
   npm run build
   ```

## Deployment (Vercel)
Website đã được thiết lập sẵn file `vercel.json` chứa các cấu hình Rewrite URL, Headers Security và Cache Control chuyên sâu.
1. Đăng nhập Vercel và chọn **Add New Project**.
2. Connect tới GitHub repository của MIG.
3. Vercel sẽ tự động nhận diện Framework là **Vite** và chạy lệnh build `npx vite build`.
4. Điền các biến môi trường (Environment Variables) lấy từ file `.env` vào Dashboard của Vercel.
5. Click **Deploy**. Mỗi lần push code lên branch `main` sẽ kích hoạt auto-deploy.

## Tính năng nổi bật
- **Framework**: React 19 + Vite 6 + TailwindCSS v4.
- **Animations**: GSAP (ScrollTrigger, Custom Cursor, Master Timeline).
- **SEO & Performance**: Chunk splitting, WebP Images, JSON-LD Structured Data, React Helmet Async, Điểm Lighthouse ~100.
- **Accessibility**: Hỗ trợ đầy đủ WCAG 2.1 AA (Keyboard navigation, Aria labels, Reduced Motion).
