document.addEventListener("DOMContentLoaded", () => {

    // Lazy-load any video marked [data-lazy-video]: its <source> carries the
    // URL in data-src (not src) so nothing downloads on initial paint. When the
    // video scrolls near the viewport, promote data-src -> src, load, and play.
    // This keeps the remote DentalRay clip off the FCP/LCP critical path.
    const lazyVideos = document.querySelectorAll('video[data-lazy-video]');
    if (lazyVideos.length && 'IntersectionObserver' in window) {
        const videoObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                const video = entry.target;
                video.querySelectorAll('source[data-src]').forEach((source) => {
                    source.src = source.dataset.src;
                    source.removeAttribute('data-src');
                });
                video.load();
                const playback = video.play();
                if (playback && typeof playback.catch === 'function') {
                    playback.catch(() => { /* autoplay may be blocked; ignore */ });
                }
                obs.unobserve(video);
            });
        }, { rootMargin: '200px' });
        lazyVideos.forEach((video) => videoObserver.observe(video));
    }

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
