document.addEventListener("DOMContentLoaded", () => {

    let introSection = document.getElementById("welcome");
    let lightSwitches = document.querySelectorAll(".lightswitch");
    let menuEl = document.getElementById("menu");

    window.addEventListener('scroll', function handleScroll(event) {

        if (window.scrollY >= 100) {
            introSection.setAttribute("data-blur", "on")
        }

        if (window.scrollY >= 200) {
            introSection.style.opacity = 0;
        }
        if (window.scrollY >= 800) {
            menuEl.classList.add("move-down");
            lightSwitches.forEach((lightswitch) => {
                lightswitch.style.top = "70px"
            });
        }


        // If Scrolling Up
        if (window.scrollY < this.lastScrollTop) {
            console.log('scrolling up');
            if (scrollY < 300) {
                introSection.style.opacity = 1;
            }
            // If scrolling up and scroll position is less than 200
            if (scrollY < 200) {
                introSection.setAttribute("data-blur", "off")
            }

            // if (window.scrollY >= 400) {
            //     menuEl.classList.remove("move-down");
            //     lightSwitches.forEach((lightswitch) => {
            //         lightswitch.style.top = "0px"
            //     });
            // }
            if (window.scrollY >= 800) {
                menuEl.classList.remove("move-down");
                lightSwitches.forEach((lightswitch) => {
                    lightswitch.style.top = "0px"
                });
            }

        }
        this.lastScrollTop = window.scrollY;
    });
});