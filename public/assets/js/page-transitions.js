document.addEventListener("DOMContentLoaded", () => {
    // Must match the transition duration set on `body` in main.css.
    const TRANSITION_MS = 600;
    // How long the main nav's own close animation takes (#mainNav / #menuEl
    // transition in main.css) - we wait this long after closing the menu
    // before scrolling or blurring the page out, so the overlay is gone first.
    const MENU_CLOSE_MS = 750;

    const navHeader = document.getElementById('navHeader');
    const menuBtn = document.getElementById('menuBtn');
    const mainNav = document.getElementById('mainNav');

    // The homepage is served from both "/" and "/index".
    const onHomepage = window.location.pathname === '/' || window.location.pathname === '/index';

    let isNavigating = false;

    // Reveal the page. The double rAF makes sure the browser has painted the
    // hidden state at least once before we switch it, so the reveal actually
    // transitions in steps instead of jumping straight to visible.
    const reveal = () => {
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                document.body.setAttribute('data-page-transition', 'visible');
            });
        });
    };

    const scrollToSection = (target) => {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    // If we arrived on the homepage targeting a section (a cross-page nav from
    // the menu redirects here as e.g. "/#about"), start from the top, dissolve
    // in, then smooth-scroll down to the section.
    let pendingTarget = null;
    if (onHomepage && window.location.hash) {
        try { pendingTarget = document.querySelector(window.location.hash); } catch (e) { pendingTarget = null; }
    }

    if (pendingTarget) {
        // Take manual control so the browser doesn't do its own instant jump
        // to the anchor before (and instead of) our animated scroll.
        if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
        history.replaceState(null, '', window.location.pathname + window.location.search);
        window.scrollTo(0, 0);
        reveal();
        setTimeout(() => scrollToSection(pendingTarget), TRANSITION_MS + 100);
    } else {
        reveal();
    }

    // When the page is restored from the browser's back/forward cache (bfcache),
    // DOMContentLoaded does NOT fire again - the page comes back exactly as it
    // was left when we navigated away: blurred out (data-page-transition removed)
    // and with navigation locked (isNavigating still true from the click that
    // took us away). Undo both so the restored page is visible and clickable.
    window.addEventListener('pageshow', (evt) => {
        if (!evt.persisted) return;
        isNavigating = false;
        document.body.setAttribute('data-page-transition', 'visible');
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

    const closeMenuIfOpen = () => {
        const menuIsOpen = navHeader && navHeader.getAttribute('data-menu-status') === 'open';
        if (menuIsOpen && menuBtn) {
            menuBtn.click();
            return true;
        }
        return false;
    };

    document.addEventListener('click', (evt) => {
        if (isNavigating) return;
        if (evt.metaKey || evt.ctrlKey || evt.shiftKey || evt.altKey || evt.button !== 0) return;

        const link = evt.target.closest('a');
        if (!link || !link.href) return;
        if (link.target === '_blank' || link.hasAttribute('download')) return;
        if (link.origin !== window.location.origin) return;

        // Does this link point at a section on the homepage? (e.g. "/#about")
        const targetsHomeSection = (link.pathname === '/' || link.pathname === '/index') && !!link.hash;

        // Case 1: already on the homepage - just close the menu and smooth
        // scroll to the section. No dissolve, no reload.
        if (targetsHomeSection && onHomepage) {
            let sectionTarget = null;
            try { sectionTarget = document.querySelector(link.hash); } catch (e) { sectionTarget = null; }
            if (!sectionTarget) return; // let the browser handle an unknown target

            evt.preventDefault();
            const doScroll = () => {
                scrollToSection(sectionTarget);
                history.replaceState(null, '', link.getAttribute('href'));
            };
            if (closeMenuIfOpen()) {
                setTimeout(doScroll, MENU_CLOSE_MS);
            } else {
                doScroll();
            }
            return;
        }

        // Case 2: everything else (including section links clicked from another
        // page) - dissolve out and navigate. On arrival, the block above scrolls
        // to the section.
        if (!isNavigableLink(link)) return;

        evt.preventDefault();
        isNavigating = true;

        const destination = link.href;
        const inMenu = mainNav && mainNav.contains(link);

        if (inMenu && closeMenuIfOpen()) {
            setTimeout(() => goTo(destination), MENU_CLOSE_MS);
        } else {
            goTo(destination);
        }
    });
});
