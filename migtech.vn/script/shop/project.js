// import { showAndHideSubNav } from './show-hide-sub-nav.js';

// const container = '.main-project';
// const bars = '#subNav-bar';
// const xmark = '#subNav-xmark';
// const categoryList = '#category-list';
// const control = '#category-control';

// showAndHideSubNav(container, categoryList, control, bars, xmark);

import { $, $$ } from '../../utils/data/variable.js';

const items = $$('.card__item');
items.forEach((item) => {
    const url = item.dataset.url;
    item.addEventListener('click', (e) => {
        window.location.href = `${url}`;
    });
});
