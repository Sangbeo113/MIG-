const items = document.querySelectorAll('.card__item');
items.forEach((item) => {
    const url = item.dataset.url;
    item.addEventListener('click', (e) => {
        if (url) window.location.href = `${url}`;
    });
});
