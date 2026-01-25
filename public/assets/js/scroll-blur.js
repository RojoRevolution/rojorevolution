document.addEventListener("DOMContentLoaded", () => {

    let introSection = document.getElementById("welcome");

    window.addEventListener('scroll', function handleScroll(event) {

        if (window.scrollY >= 100) {
            introSection.setAttribute("data-blur", "on")
        }

        // If Scrolling Down - Not needed for this implementation but preserving
        // if (window.scrollY > this.lastScrollTop || 0) {
        //     console.log('scrolling down');
        // }

        // If Scrolling Up
        if (window.scrollY < this.lastScrollTop) {
            console.log('scrolling up');
            // If scrolling up and scroll position is less than 200
            if (scrollY < 200) {
                introSection.setAttribute("data-blur", "off")

            }
        }
        this.lastScrollTop = window.scrollY;
    });
});