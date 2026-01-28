document.addEventListener("DOMContentLoaded", () => {

    let introSection = document.getElementById("welcome");
    let lightSwitches = document.querySelectorAll(".lightswitch");
    let menuEl = document.querySelector(".menu-pos");
    let featuredHeader = document.querySelector('[data-feature-type=work]');

    window.addEventListener('scroll', function handleScroll(event) {

        if (window.scrollY >= 100) {
            introSection.setAttribute("data-blur", "on")
        }

        if (window.scrollY >= 200) {
            introSection.style.opacity = 0;
        }
        if (window.scrollY >= 800) {
            menuEl.style.top = "70px"
            lightSwitches.forEach((lightswitch) => {
                lightswitch.style.top = "70px"
            });
        }


        // If Scrolling Up
        if (window.scrollY < this.lastScrollTop) {
            // Get First Section header y position
            let headerScrollTrigger = featuredHeader.getBoundingClientRect().top;

            if (scrollY < 300) {
                introSection.style.opacity = 1;
            }
            if (scrollY < 200) {
                introSection.setAttribute("data-blur", "off")
            }
            if (headerScrollTrigger > 10) {
                menuEl.style.top = "0px"
                lightSwitches.forEach((lightswitch) => {
                    lightswitch.style.top = "0px"
                });
            }
            // if (window.scrollY >= 800) {
            //     lightSwitches.forEach((lightswitch) => {
            //         lightswitch.style.top = "0px"
            //     });
            // }

        }
        this.lastScrollTop = window.scrollY;
    });
});