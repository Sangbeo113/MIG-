import { $, $$ } from '../../utils/data/variable.js';
import { Carousel } from '../../utils/partials/carousel-card.js';

// giả sử class Carousel đã được định nghĩa ở scope
const CAROUSELS = [];

function initAllCarousels(root = document) {
    document.querySelectorAll('.carousel__card').forEach((container) => {
        // tránh khởi tạo hai lần cho cùng một container
        if (container.__carouselInstance) return;

        const view = container.querySelector('.carousel__viewport');
        const track = container.querySelector('.carousel__track');
        const prev = container.querySelector('#prev');
        const next = container.querySelector('#next');
        const progress = container.querySelector('#progress');
        const gap = parseInt(container.dataset.gap || '30', 10);

        // nếu thiếu phần tử bắt buộc thì bỏ qua
        if (!view || !track || !prev || !next || !progress) return;

        const instance = new Carousel({
            view,
            track,
            prev,
            next,
            progress,
            gap: parseInt(container.dataset.gap || '30' | 10),
            transitionDuration: 420,
            easing: 'cubic-bezier(.22, .9, .35, 1',
            pcClickThreshold: 1,
            mobileClickThreshold: 12,
        });

        // gán reference để tránh khởi tạo 2 lần và để truy cập khi cần
        container.__carouselInstance = instance;
        CAROUSELS.push({ container, instance });
    });
}

// khởi tạo ngay khi script tải
initAllCarousels();
