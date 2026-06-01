/**
 * MIG Technology – Component Loader
 * Automatically fetches and injects HTML partials (e.g., Navbar, Footer)
 * using the fetch API, then dispatches an event when done so that
 * dependent scripts (like GSAP animations) can initialize safely.
 */

class ComponentLoader {
    constructor() {
        this.elements = document.querySelectorAll('[data-include]');
        this.loadedCount = 0;
        this.totalCount = this.elements.length;
    }

    async init() {
        if (this.totalCount === 0) {
            this.dispatchReadyEvent();
            return;
        }

        const loadPromises = Array.from(this.elements).map(async (el) => {
            const file = el.getAttribute('data-include');
            try {
                const response = await fetch(file);
                if (response.ok) {
                    const content = await response.text();
                    // Replace the placeholder div with the fetched content
                    el.outerHTML = content;
                } else {
                    console.error(`Failed to load component: ${file} (Status: ${response.status})`);
                }
            } catch (error) {
                console.error(`Error fetching component ${file}:`, error);
            } finally {
                this.loadedCount++;
            }
        });

        await Promise.all(loadPromises);
        this.dispatchReadyEvent();
    }

    dispatchReadyEvent() {
        // Dispatch custom event to notify that all DOM components are fully loaded
        const event = new Event('componentsLoaded');
        document.dispatchEvent(event);
    }
}

// Run the loader as early as possible
document.addEventListener('DOMContentLoaded', () => {
    const loader = new ComponentLoader();
    loader.init();
});
