const items = document.querySelectorAll('.blog__item');
items.forEach((item) => {
    const url = item.dataset.url;
    const category = item.dataset.category;
    item.addEventListener('click', (e) => {
        if (url && category) window.location.href = `/tin-tuc/${category}/${url}`;
    });
});
