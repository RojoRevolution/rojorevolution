document.addEventListener("DOMContentLoaded", () => {
    const bodyEl = document.body;
    const headerEl = document.getElementById("navHeader");
    const menuBtn = document.getElementById("menuBtn");

    const filmGrainSlider = document.querySelector("#filmGrain")
    const colorRangeSlider = document.querySelector("#colorRange")
    const filmEffectBg = document.querySelector(".film-effect-bg")
    const GRAYSCALE_SELECTOR = "img, .card>.img-container, #acopon .img-panel, #acopon #acoponColors, #acopon .row.pattern.dark, #acopon .row.pattern.pattern.light, #acopon .cask-pattern, .cask-photos, .molotov-container"

    // Restore slider values from a previous visit, if any, so settings
    // carry over between pages.
    const savedFilmGrain = localStorage.getItem(filmGrainSlider.id);
    if (savedFilmGrain !== null) filmGrainSlider.value = savedFilmGrain;

    const savedColorRange = localStorage.getItem(colorRangeSlider.id);
    if (savedColorRange !== null) colorRangeSlider.value = savedColorRange;

    const toggleMenu = (status) => {
        console.log(status);

        if (status === "open") {
            headerEl.setAttribute("data-menu-status", "closed");
            menuBtn.setAttribute("data-menu-status", "closed");
            headerEl.classList.remove("bg-blur");
            bodyEl.classList.remove("overflow-hidden");
            menuBtn.innerHTML = "Menu";

        }
        if (status === "closed") {
            headerEl.setAttribute("data-menu-status", "open");
            menuBtn.setAttribute("data-menu-status", "open");
            headerEl.classList.add("bg-blur");
            bodyEl.classList.add("overflow-hidden");
            menuBtn.innerHTML = "Close Menu";
        }
    }

    menuBtn.addEventListener("click", (e) => {
        e.preventDefault();
        let menuStatus = e.currentTarget.getAttribute("data-menu-status");


        toggleMenu(menuStatus);
    });

    const updateSliderTrack = (slider) => {
        const value = slider.value;
        slider.style.background = `linear-gradient(to right, #f50 ${value}%, #ccc ${value}%)`;
    }

    [filmGrainSlider, colorRangeSlider].forEach((slider) => {
        slider.addEventListener("input", () => {
            updateSliderTrack(slider);
            localStorage.setItem(slider.id, slider.value);
        });
        updateSliderTrack(slider);
    });

    // Film grain slider also drives the film effect's opacity - 0 at the
    // far left, 100% at the far right.
    const updateFilmGrainOpacity = () => {
        filmEffectBg.style.opacity = filmGrainSlider.value / 100;
    }

    filmGrainSlider.addEventListener("input", updateFilmGrainOpacity);
    updateFilmGrainOpacity();

    // Image color slider drives grayscale on the grouped image elements -
    // inverse of film grain: 100% grayscale at the far left, 0% at the far right.
    const applyGrayscale = (el) => {
        const grayscaleAmount = (100 - colorRangeSlider.value) / 100;
        el.style.filter = `grayscale(${grayscaleAmount})`;
    }

    const updateImageGrayscale = () => {
        document.querySelectorAll(GRAYSCALE_SELECTOR).forEach(applyGrayscale);
    }

    colorRangeSlider.addEventListener("input", updateImageGrayscale);
    updateImageGrayscale();

    // Some pages (e.g. /labels, /logos) fetch their images and add them to
    // the page after this script has already run, so a one-time query at
    // load time misses them. Watch for new matching elements and apply the
    // current grayscale amount as soon as they appear.
    const grayscaleObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType !== 1) return;
                if (node.matches(GRAYSCALE_SELECTOR)) applyGrayscale(node);
                node.querySelectorAll(GRAYSCALE_SELECTOR).forEach(applyGrayscale);
            });
        });
    });

    grayscaleObserver.observe(document.body, { childList: true, subtree: true });

});