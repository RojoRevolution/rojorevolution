document.addEventListener("DOMContentLoaded", () => {
    const projectWorkSection = document.getElementById("work");
    const projectStorySection = document.getElementById("projectStory");
    const storyButtonEl = document.querySelectorAll("#storyBtn button");
    const scrollSection = document.querySelector(".scroll-section ")
    const storySectionTop = document.getElementById("storyTop");
    const projectControlsContainer = document.querySelector(".controls-container")
    const projectViewControls = document.querySelector(".project-view")
    const projectViewControlsParagraph = document.querySelector(".project-view p")

    const removeDisabledFromAllBtns = () => {
        storyButtonEl.forEach((button) => {
            button.setAttribute("data-active", "false");
            button.disabled = false;
        });
    };

    storyButtonEl.forEach((button) => {
        button.addEventListener("click", (event) => {
            event.preventDefault();
            let clickedButton = event.currentTarget;
            let content = clickedButton.getAttribute("data-content");
            let distanceFromTop = window.scrollY;

            // Remove all Data Attributes
            removeDisabledFromAllBtns();
            clickedButton.setAttribute("data-active", "true");
            // Set Attributes ad Show Content
            switch (content) {
                case "work":
                    projectWorkSection.setAttribute("data-status", "show");
                    projectStorySection.setAttribute("data-status", "hide");
                    // scrollSection.classList.remove("overflow-auto");
                    // bodyEl.classList.remove("lock-scroll");
                    break;
                case "story":
                    projectWorkSection.setAttribute("data-status", "hide");
                    projectStorySection.setAttribute("data-status", "show");
                    if (distanceFromTop > 300) {
                        storySectionTop.scrollIntoView('{behavior: "smooth}')
                    }
                    break;
                default:
                    break;
            }

            clickedButton.disabled = true;
        });
    });

    window.addEventListener("scroll", (e) => {
        e.preventDefault;
        if (window.scrollY > 400) {
            projectControlsContainer.classList.add("move-controls");
            projectViewControlsParagraph.classList.add("display-none");
        }
        if (window.scrollY < 400) {
            projectControlsContainer.classList.remove("move-controls");
            projectViewControlsParagraph.classList.remove("display-none");

        }
    })

    // window.addEventListener('wheel', (e) => {
    //     const atBottom = scrollSection.scrollTop + scrollSection.clientHeight >= scrollSection.scrollHeight;
    //     const atTop = scrollSection.scrollTop === 0;

    //     if ((!atBottom && e.deltaY > 0) || (!atTop && e.deltaY < 0)) {
    //         scrollSection.scrollTop += e.deltaY;
    //         e.preventDefault();
    //     }
    // }, { passive: false });


});