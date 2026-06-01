const fs = require('fs');
const path = require('path');

const templates = {
    A: fs.readFileSync('migtech.vn/dich-vu/thi-cong-bao-tri-led/index.html', 'utf8'),
    B: fs.readFileSync('migtech.vn/gioi-thieu.html', 'utf8'),
    C: fs.readFileSync('migtech.vn/tin-tuc/tat-ca-bai-viet.html', 'utf8')
};

const pagesToBuild = [
    {
        template: 'A',
        file: 'migtech.vn/dich-vu/sua-chua-thiet-bi.html',
        replacements: {
            'Thi Công Bảo Trì Đèn LED Tòa Nhà': 'Sửa Chữa Thiết Bị Điện - Điện Tử',
            'Thi công bảo trì đèn LED': 'Sửa chữa thiết bị điện',
            'tòa nhà cao tầng': 'công nghiệp & dân dụng',
            'Thi công bảo trì LED': 'Sửa chữa thiết bị',
            '../../': '../', // Since it's one level up compared to Pilot A
            '../..': '..'
        }
    },
    {
        template: 'A',
        file: 'migtech.vn/dich-vu/thiet-ke-theo-yeu-cau.html',
        replacements: {
            'Thi Công Bảo Trì Đèn LED Tòa Nhà': 'Thiết Kế Sản Phẩm Theo Yêu Cầu',
            'Thi công bảo trì đèn LED': 'Thiết kế bo mạch &',
            'tòa nhà cao tầng': 'sản phẩm theo yêu cầu',
            'Thi công bảo trì LED': 'Thiết kế theo yêu cầu',
            '../../': '../',
            '../..': '..'
        }
    },
    {
        template: 'A',
        file: 'migtech.vn/dich-vu/cung-ung-thiet-bi.html',
        replacements: {
            'Thi Công Bảo Trì Đèn LED Tòa Nhà': 'Cung Ứng Nhập Khẩu Thiết Bị',
            'Thi công bảo trì đèn LED': 'Cung ứng & nhập khẩu',
            'tòa nhà cao tầng': 'thiết bị điện tử',
            'Thi công bảo trì LED': 'Cung ứng thiết bị',
            '../../': '../',
            '../..': '..'
        }
    },
    {
        template: 'B',
        file: 'migtech.vn/lien-he.html',
        replacements: {
            'Giới Thiệu Công Ty – MIG Technology': 'Liên Hệ – MIG Technology',
            'Về Chúng Tôi': 'Liên Hệ Với Chúng Tôi',
            'Giới thiệu': 'Liên hệ',
            'MIG Technology – Đối tác công nghệ đáng tin cậy': 'Luôn sẵn sàng hỗ trợ bạn 24/7'
        }
    },
    {
        template: 'B',
        file: 'migtech.vn/chinh-sach.html',
        replacements: {
            'Giới Thiệu Công Ty – MIG Technology': 'Chính Sách – MIG Technology',
            'Về Chúng Tôi': 'Chính Sách Bảo Hành',
            'Giới thiệu': 'Chính sách',
            'MIG Technology – Đối tác công nghệ đáng tin cậy': 'Cam kết chất lượng và dịch vụ'
        }
    },
    {
        template: 'C',
        file: 'migtech.vn/du-an.html',
        replacements: {
            'Tin Tức & Cập Nhật – MIG Technology': 'Dự Án Tiêu Biểu – MIG Technology',
            'Tin Tức & Cập Nhật': 'Dự Án Nổi Bật',
            'Tin tức': 'Dự án',
            '../': '', // It's at root level, but template is at tin-tuc/
            'data-base=".."': ''
        }
    },
    {
        template: 'C',
        file: 'migtech.vn/tin-tuc/sua-chua-thiet-bi.html',
        replacements: {
            'Tin Tức & Cập Nhật – MIG Technology': 'Tin Tức Sửa Chữa – MIG Technology',
            'Tin Tức & Cập Nhật': 'Tin Tức Sửa Chữa Thiết Bị',
            'Tin tức': 'Sửa chữa thiết bị'
        }
    },
    {
        template: 'C',
        file: 'migtech.vn/tin-tuc/thi-cong-bao-tri-led.html',
        replacements: {
            'Tin Tức & Cập Nhật – MIG Technology': 'Tin Tức Đèn LED – MIG Technology',
            'Tin Tức & Cập Nhật': 'Tin Tức Thi Công Đèn LED',
            'Tin tức': 'Thi công LED'
        }
    }
];

pagesToBuild.forEach(page => {
    let content = templates[page.template];
    for (const [search, replace] of Object.entries(page.replacements)) {
        // Replace all occurrences
        content = content.split(search).join(replace);
    }
    
    // For du-an.html which moved to root, fix the navbar/footer data-include
    if (page.file === 'migtech.vn/du-an.html') {
        content = content.replace(/data-include="partials\/navbar.html"\s*/, 'data-include="partials/navbar.html"');
        content = content.replace(/data-include="partials\/footer.html"\s*/, 'data-include="partials/footer.html"');
    }

    fs.writeFileSync(page.file, content, 'utf8');
    console.log(`Cloned and generated: ${page.file}`);
});
