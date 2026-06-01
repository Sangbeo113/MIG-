import { SlideShow } from '../../utils/partials/auto-slider.js';
import { $ } from '../../utils/data/variable.js';
const banner = $('.banner-main');
const slideElm = $('.slide-show');
const tracks = $('.slide-show__track');
const dots = $('.slide-show__list-dot');
const banners = JSON.parse($('.slide-show__track').dataset.imgs);
const contents = JSON.parse($('.slide-show__track').dataset.contents);

//render banner
try {
    let imgHtml = '';
    let dotHtml = '';
    let newImgs = '';

    const renderHTML = (device) => {
        const listDevice = [];
        banners.forEach((banner) => {
            listDevice.push(banner.device);
        });
        const isTrue = listDevice.some((d) => d === device);
        if (!isTrue && device !== 'desktop') {
            newImgs = banners.find((banner) => banner.device === 'desktop');
        } else {
            newImgs = banners.find((banner) => banner.device === device);
        }

        JSON.parse(newImgs.imageURL).forEach((img, i) => {
            imgHtml += `<a href="/${
                contents[i].slug
            }" class="slide-show__thumb">
            <img
        class="slide-show__img"
        src="/uploads/images/banners/${img}"
        alt="${JSON.parse(newImgs.alt)[i]}" />
        </a>`;
            // if (i === 0) {
            //     dotHtml += `
            // <div class="slide-show__dot active-dot"></div>
            // `;
            // } else {
            //     dotHtml += `<div class='slide-show__dot'></div>`;
            // }
        });
    };
    if (banner.clientWidth > 991.98) {
        renderHTML('desktop');
        tracks.innerHTML = imgHtml;
        // dots.innerHTML = dotHtml;
        // console.log('desktop');
    }

    if (banner.clientWidth >= 768.9 && banner.clientWidth < 991.9) {
        renderHTML('tablet');
        tracks.innerHTML = imgHtml;
        // dots.innerHTML = dotHtml;
        // console.log('tablet');
    }

    if (banner.clientWidth < 768.9) {
        renderHTML('mobile');
        tracks.innerHTML = imgHtml;
        // dots.innerHTML = dotHtml;
        // console.log('mobile');
    }
} catch (err) {
    console.log(err);
    console.log('Image is not found');
}

// if (banner.clientWidth > 991.9) {
//     drawWaveBanner('.slide-show');
// }

const show = new SlideShow(slideElm, banner, contents);
show.init();
