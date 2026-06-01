import { $, $$ } from '../../utils/data/variable.js';
import { hiddenNav } from '../../utils/partials/hidden-nav-when-scroll.js';
import { ShowMenuMobile } from '../../utils/partials/nav-mobi-script.js';

const navDesktop = $('.nav__desktop');
const navMobile = $('.nav__mobile');

if ($('.top-bar').offsetWidth > 991.98) {
    navMobile.style.display = 'none';
} else {
    navDesktop.style.display = 'none';
    const elm = $('.nav__mobile');
    // navbar mobile script
    new ShowMenuMobile(elm).init();
}

// show hide service
if ($('.top-bar').offsetWidth > 991.98) {
    document.addEventListener('DOMContentLoaded', function () {
        const trigger = document.querySelector('.active__subnav');
        const subnav = document.querySelector('.subnav');
        const fullHeight = subnav.scrollHeight + 40;

        let timeout;

        const showSubnav = () => {
            clearTimeout(timeout);
            subnav.style.height = fullHeight + 'px';
            subnav.style.opacity = '1';
            subnav.style.visibility = 'visible';
        };

        const hideSubnav = () => {
            timeout = setTimeout(() => {
                subnav.style.opacity = '0';
                subnav.style.visibility = 'hidden';
                subnav.style.height = '0';
            }, 200); // delay nhỏ để tránh mất hiệu ứng khi chuyển giữa trigger và subnav
        };

        trigger.addEventListener('mouseenter', showSubnav);
        trigger.addEventListener('mouseleave', hideSubnav);
        subnav.addEventListener('mouseenter', showSubnav);
        subnav.addEventListener('mouseleave', hideSubnav);
    });
}
