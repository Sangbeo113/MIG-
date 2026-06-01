/**
 * MIG Technology – Component Loader v2
 * Fetches and injects HTML partials (Navbar, Footer) via fetch API.
 * Supports pages in subdirectories via the data-base attribute.
 *
 * Usage:
 *   Root-level page:    <div data-include="partials/navbar.html"></div>
 *   Subdirectory page:  <div data-include="partials/navbar.html" data-base=".."></div>
 *
 * After all components are injected, fires the "componentsLoaded" event
 * so that GSAP and other scripts can safely initialize.
 */

class ComponentLoader {
    constructor() {
        this.elements = Array.from(document.querySelectorAll('[data-include]'));
        this.totalCount = this.elements.length;
    }

    async init() {
        if (this.totalCount === 0) {
            this.dispatchReadyEvent();
            return;
        }

        const loadPromises = this.elements.map(async (el) => {
            const partialPath = el.getAttribute('data-include');
            const base = el.getAttribute('data-base') || '';
            const url = base ? `${base}/${partialPath}` : partialPath;

            try {
                const response = await fetch(url);
                if (response.ok) {
                    const html = await response.text();
                    // Insert the partial and remove the placeholder
                    el.outerHTML = html;
                } else {
                    console.warn(`[ComponentLoader] Failed: ${url} (${response.status})`);
                    el.remove();
                }
            } catch (err) {
                console.error(`[ComponentLoader] Error fetching ${url}:`, err);
                el.remove();
            }
        });

        await Promise.all(loadPromises);

        // Mark active nav link based on current page URL
        this.markActiveNavLink();

        this.dispatchReadyEvent();
    }

    markActiveNavLink() {
        const currentPath = window.location.pathname;
        // Normalize: strip trailing slash and filename
        const currentPage = currentPath.split('/').filter(Boolean).pop() || 'index.html';

        document.querySelectorAll('#desktop-menu .nav-link, #mobile-menu a').forEach((link) => {
            const href = link.getAttribute('href') || '';
            const linkPage = href.split('/').filter(Boolean).pop() || '';

            // Mark active if the link href ends with the current page name
            const isActive = href.includes(currentPage) ||
                             (currentPage === 'index.html' && (href === '/' || href.endsWith('index.html')));

            if (isActive) {
                link.classList.add('active');
                link.classList.replace('text-gray-500', 'text-gray-900');
            }
        });
    }

    dispatchReadyEvent() {
        document.dispatchEvent(new Event('componentsLoaded'));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ComponentLoader().init();
});
