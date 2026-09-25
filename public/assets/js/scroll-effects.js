document.addEventListener("DOMContentLoaded", () => {

    let introSection = document.querySelector('[data-header-type="intro"]');

    // The intro is home-page only, but this script loads on every page. Bail
    // when it's absent so neither the reload-sync below nor the scroll handler
    // dereferences a null element.
    if (!introSection) return;

    // On (re)load the scroll handler hasn't fired yet, so a browser-restored
    // scroll position further down the page leaves the sticky intro fully
    // visible (default opacity 1, no blur). Apply the same hidden state the
    // scroll handler would, when we load already scrolled past it.
    const hideIntroIfScrolledPast = () => {
        if (window.scrollY > 100) {
            introSection.setAttribute("data-blur", "on");
            introSection.style.opacity = 0;
        }
    };

    // Run now for the common case, and again on load: the browser can restore
    // the scroll position after DOMContentLoaded, so the load pass is the
    // reliable one.
    hideIntroIfScrolledPast();
    window.addEventListener("load", hideIntroIfScrolledPast);

    window.addEventListener('scroll', function handleScroll(event) {

        if (window.scrollY >= 100) {
            introSection.setAttribute("data-blur", "on")
        }

        if (window.scrollY >= 200) {
            introSection.style.opacity = 0;
        }
        // If Scrolling Up
        if (window.scrollY < this.lastScrollTop) {
            if (scrollY <= 300) {
                introSection.style.opacity = 1;
            }
            if (scrollY <= 200) {
                introSection.setAttribute("data-blur", "off")
            }

        }
        this.lastScrollTop = window.scrollY;
    });
});
