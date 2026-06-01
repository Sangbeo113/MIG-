# Kế Hoạch Cải Tổ Dự Án MigWeb (Dựa Trên Codegraph)

## 1) Hiện trạng đã xác nhận từ codegraph/source

- Codegraph hiện có:
  - `files`: 29
  - `nodes`: 74
  - `edges`: 65
  - Điểm nóng: `migtech.vn/script/shop/banner-script.js`, `navbar-script.js`, `home.js`
- Entry points JS theo trang hiện tại:
  - `navbar-script.js` xuất hiện hầu hết các trang
  - `banner-script.js` + `home.js` ở trang chủ
  - `service.js` ở nhóm trang dịch vụ
  - `project.js` ở nhóm trang dự án/chính sách
  - `blog.js` ở nhóm trang tin tức
- Rủi ro kiến trúc lớn:
  - Các file `migtech.vn/script/shop/*.js` đang `import` từ `../../utils/...` nhưng thư mục `utils` không tồn tại trong repo mirror.
  - Dấu hiệu code lỗi runtime:
    - `gap: parseInt(container.dataset.gap || '30' | 10)` ở `home.js` (toán tử sai).
    - `easing: 'cubic-bezier(.22, .9, .35, 1'` thiếu dấu `)`.
    - Selector id lặp (`#prev`, `#next`, `#progress`) dùng trong nhiều carousel.
  - CSS tập trung vào một file lớn `migtech.vn/css/main.css` (~6,961 dòng), khó bảo trì.

## 2) Mục tiêu cải tổ

- Biến dự án thành codebase có thể bàn giao chuyên nghiệp:
  - Chạy ổn định, không lỗi module/runtime.
  - Cấu trúc rõ ràng theo component/page.
  - Dễ mở rộng nội dung, dễ bảo trì cho đội vận hành.
  - Có kiểm thử cơ bản, CI/CD, chuẩn performance/SEO/accessibility.

## 3) Roadmap triển khai (ưu tiên theo rủi ro)

### Giai đoạn A - Stabilize (P0, 3-5 ngày)

- A1. Khóa phạm vi source first-party
  - Tách tài nguyên mirror bên thứ ba (facebook/google/cdn) khỏi vùng source chỉnh sửa.
  - Re-run codegraph chỉ trên `migtech.vn/**` first-party.
- A2. Sửa lỗi runtime/module tức thời
  - Khôi phục hoặc thay thế module `utils/*` đang thiếu.
  - Vá toàn bộ lỗi JS blocking:
    - `home.js` parseInt sai toán tử.
    - `home.js` + `service.js` chuỗi `cubic-bezier(...)` sai cú pháp.
    - Guard null cho `.top-bar`, `.subnav`, `.active__subnav`, dataset JSON parse.
- A3. Thiết lập baseline build/check
  - Thêm `package.json` + tooling tối thiểu: `eslint`, `prettier`.
  - Chuẩn hóa format và lint toàn bộ JS/CSS/HTML.

### Giai đoạn B - Restructure (P1, 1-2 tuần)

- B1. Tái cấu trúc thư mục
  - Đề xuất:
    - `src/js/core/*` (dom helpers, constants)
    - `src/js/components/*` (navbar, carousel, slideshow)
    - `src/js/pages/*` (home, service, project, blog)
    - `src/styles/base|components|pages/*`
- B2. Tách CSS monolith
  - Chia `main.css` theo base/layout/component/page.
  - Chuẩn hóa token màu, spacing, typography bằng CSS variables.
- B3. Chuẩn hóa template dùng chung
  - Trích `header/footer/nav/subnav` thành partial/template để tránh lặp HTML giữa 23 trang.
  - Đồng bộ metadata SEO/OpenGraph/canonical cho tất cả trang.

### Giai đoạn C - Quality & UX (P1, 1 tuần)

- C1. Accessibility + Responsive
  - Soát lại heading hierarchy, alt text, focus states, keyboard nav.
  - Sửa các layout breakpoint hardcode và tương thích mobile.
- C2. Performance
  - Ảnh: chuyển WebP/AVIF (nếu phù hợp), lazy loading, khai báo width/height.
  - JS/CSS: minify, loại dead code/comment cũ.
  - Font: giảm số lượng font weight không cần thiết.
- C3. Nội dung & encoding
  - Chuẩn hóa UTF-8 toàn bộ file, loại lỗi hiển thị ký tự.
  - Rà lại nội dung placeholder/chính sách để đúng brand khách hàng.

### Giai đoạn D - Delivery Ready (P2, 3-5 ngày)

- D1. Kiểm thử
  - Smoke test toàn bộ route chính.
  - Thêm E2E cơ bản (Playwright): menu, carousel, điều hướng card/blog, form liên hệ.
- D2. CI/CD + monitoring
  - Pipeline: lint + test + build.
  - Thiết lập Lighthouse budget (performance/SEO/accessibility) làm tiêu chí chặn merge.
- D3. Bàn giao
  - Viết tài liệu: kiến trúc, quy trình deploy, checklist vận hành.
  - Chốt changelog và hướng dẫn team khách hàng.

## 4) Quick wins nên làm ngay (trong ngày đầu)

- Sửa 3 lỗi JS có khả năng gây fail runtime:
  - `migtech.vn/script/shop/home.js` dòng 28
  - `migtech.vn/script/shop/home.js` dòng 30
  - `migtech.vn/script/shop/service.js` dòng 21
- Thêm null guards cho `navbar-script.js` dòng 8-22 trước khi truy cập DOM.
- Tạo module `dom helpers` nội bộ thay cho import `../../utils/*` đang thiếu.

## 5) Definition of Done cho dự án “chuyên nghiệp”

- Không còn import gãy hoặc lỗi JS runtime trên các trang chính.
- Codegraph mới thể hiện dependency rõ ràng giữa core/components/pages.
- CSS đã tách lớp, không còn một file monolith khó kiểm soát.
- Có lint/test/CI chạy tự động.
- Điểm Lighthouse mục tiêu (mobile):
  - Performance >= 80
  - Accessibility >= 90
  - Best Practices >= 90
  - SEO >= 90
- Có tài liệu bàn giao đầy đủ để team khác tiếp quản.

## 6) Thứ tự triển khai đề xuất với khách hàng

1. Chốt phạm vi và KPI kỹ thuật (0.5 ngày).
2. Làm Giai đoạn A để “hết cháy” trước.
3. Làm Giai đoạn B để “đỡ nợ kỹ thuật” và tăng tốc phát triển.
4. Làm Giai đoạn C để nâng chất lượng trải nghiệm.
5. Làm Giai đoạn D để đủ chuẩn bàn giao và vận hành.

