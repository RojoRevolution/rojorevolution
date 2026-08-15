document.addEventListener("DOMContentLoaded", () => {

    // let introSection = document.getElementById("welcome");
    let introSection = document.querySelector('[data-header-type="intro"]');
    let lightSwitches = document.querySelectorAll(".lightswitch");
    let featuredHeader = document.querySelector('[data-feature-type=work]');

    window.addEventListener('scroll', function handleScroll(event) {

        if (window.scrollY >= 100) {
            introSection.setAttribute("data-blur", "on")
        }

        if (window.scrollY >= 200) {
            introSection.style.opacity = 0;
        }
        // If Scrolling Up
        if (window.scrollY < this.lastScrollTop) {
            // Get First Section header y position
            // let headerScrollTrigger = featuredHeader.getBoundingClientRect().top;

            if (scrollY <= 300) {
                console.log("Scroll is at 300 or less")
                introSection.style.opacity = 1;
            }
            if (scrollY <= 200) {
                console.log("Scroll is at 200 or less")
                introSection.setAttribute("data-blur", "off")
            }

        }
        this.lastScrollTop = window.scrollY;
    });
});