document.addEventListener("DOMContentLoaded", () => {
    // Must match the transition duration set on `body` in main.css.
    const TRANSITION_MS = 600;
    // How long the main nav's own close animation takes (#mainNav ul's
    // transition in main.css) - we wait this long before blurring the page
    // out so the menu is fully closed first.
    const MENU_CLOSE_MS = 750;

    const navHeader = document.getElementById('navHeader');
    const menuBtn = document.getElementById('menuBtn');
    const mainNav = document.getElementById('mainNav');

    let isNavigating = false;

    // Reveal the page once it's loaded. The double rAF makes sure the browser
    // has painted the hidden state at least once before we switch it, so the
    // reveal actually transitions in steps instead of jumping straight to visible.
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            document.body.setAttribute('data-page-transition', 'visible');
        });
    });

    // Only same-origin links that actually go somewhere - skips "#"
    // placeholders, external links, new-tab links, and downloads.
    const isNavigableLink = (link) => {
        if (!link || !link.href) return false;
        if (link.target === '_blank' || link.hasAttribute('download')) return false;
        if (link.origin !== window.location.origin) return false;
        const rawHref = link.getAttribute('href');
        if (!rawHref || rawHref.startsWith('#')) return false;
        return true;
    };

    // Blur the page out, then follow the link once the effect has finished.
    const goTo = (url) => {
        document.body.removeAttribute('data-page-transition');
        setTimeout(() => {
            window.location.href = url;
        }, TRANSITION_MS);
    };

    document.addEventListener('click', (evt) => {
        if (isNavigating) return;
        if (evt.metaKey || evt.ctrlKey || evt.shiftKey || evt.altKey || evt.button !== 0) return;

        const link = evt.target.closest('a');
        if (!isNavigableLink(link)) return;

        evt.preventDefault();
        isNavigating = true;

        const destination = link.href;
        const menuIsOpen = navHeader && navHeader.getAttribute('data-menu-status') === 'open';

        if (mainNav && mainNav.contains(link) && menuIsOpen) {
            // Close the main nav first, then blur the page out once it's closed.
            menuBtn.click();
            setTimeout(() => goTo(destination), MENU_CLOSE_MS);
        } else {
            goTo(destination);
        }
    });
});
