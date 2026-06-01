import { $, $$ } from '../../utils/data/variable.js';

const items = $$('.blog__item');
items.forEach((item) => {
    const url = item.dataset.url;
    const category = item.dataset.category;
    item.addEventListener('click', (e) => {
        window.location.href = `/tin-tuc/${category}/${url}`;
    });
});
