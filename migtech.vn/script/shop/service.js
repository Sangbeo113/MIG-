import { Carousel } from '../../utils/partials/carousel-card.js';
import { $ } from '../../utils/data/variable.js';

function initCarousel(root = document) {
    const view = $('.carousel__viewport');
    const track = $('.carousel__track');
    const prev = $('#prev');
    const next = $('#next');
    const progress = $('#progress');

    if (!view || !track || !prev || !next || !progress) return;

    new Carousel({
        view,
        track,
        prev,
        next,
        progress,
        gap: 30,
        transitionDuration: 420,
        easing: 'cubic-bezier(.22, .9, .35, 1',
        pcClickThreshold: 1,
        mobileClickThreshold: 12,
    });
}

initCarousel();
