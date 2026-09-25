document.addEventListener("DOMContentLoaded", () => {
    // The accordion only exists in the homepage About section - bail out
    // cleanly on every other page (this script loads site-wide).
    const aboutSection = document.getElementById("about");
    if (!aboutSection) return;

    const OPEN = "open";
    const CLOSED = "closed";
    // Must match the .accordion-content transition in components.css so the
    // content isn't hidden (display:none) until its fade-out has finished.
    const FADE_MS = 250;

    // Swap the +/- Bootstrap icon to match the open/closed state.
    const setIcon = (item, opened) => {
        const icon = item.querySelector("i.bi-plus, i.bi-dash");
        if (!icon) return;
        icon.classList.toggle("bi-dash", opened);
        icon.classList.toggle("bi-plus", !opened);
    };

    const openAccordion = (item) => {
        item.setAttribute("data-accordion-status", OPEN);
        setIcon(item, true);
        const content = item.querySelector(".accordion-content");
        if (!content) return;
        content.style.display = "block";
        // Force a reflow so the browser registers the display:block + opacity:0
        // starting state before we set opacity:1 - that makes the CSS fade
        // actually animate, without depending on requestAnimationFrame (which
        // is throttled in background tabs and would leave content invisible).
        void content.offsetHeight;
        content.style.opacity = "1";
    };

    const closeAccordion = (item) => {
        item.setAttribute("data-accordion-status", CLOSED);
        setIcon(item, false);
        const content = item.querySelector(".accordion-content");
        if (!content) return;
        content.style.opacity = "0";
        // Hide only after the fade-out finishes - but not if it was re-opened
        // in the meantime.
        setTimeout(() => {
            if (item.getAttribute("data-accordion-status") === CLOSED) {
                content.style.display = "none";
            }
        }, FADE_MS);
    };

    // Delegated so a click anywhere inside an accordion item toggles it, and
    // it keeps working regardless of how the items are rendered.
    aboutSection.addEventListener("click", (evt) => {
        const item = evt.target.closest(".accordion");
        if (!item) return;

        if (item.getAttribute("data-accordion-status") === CLOSED) {
            openAccordion(item);
        } else {
            closeAccordion(item);
        }
    });
});
