document.addEventListener("DOMContentLoaded", () => {
    const projectWorkSection = document.getElementById("work");
    const projectStorySection = document.getElementById("projectStory");
    const storyButtonEl = document.querySelectorAll("#storyBtn button");
    const scrollSection = document.querySelector(".scroll-section ")
    const storySectionTop = document.getElementById("storyTop");
    const switchTooltipEl = document.querySelector('.point-container[data-type="viewSwitch"]');

    let projectContentTooltip;

    projectContentTooltip = localStorage.getItem('projectStoryTooltip');

    if (projectContentTooltip === "true") {
        switchTooltipEl.classList.add("display-none");
        console.log("In If Loop")
    }

    const removeDisabledFromAllBtns = () => {
        storyButtonEl.forEach((button) => {
            button.setAttribute("data-active", "false");
            button.disabled = false;
        });
    };

    // Button Group controls changes content
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
                    break;
                case "story":
                    projectWorkSection.setAttribute("data-status", "hide");
                    projectStorySection.setAttribute("data-status", "show");
                    if (!projectContentTooltip || projectContentTooltip === "false") {
                        localStorage.setItem('projectStoryTooltip', 'true')
                        switchTooltipEl.classList.add("display-none");
                    }
                    storySectionTop.scrollIntoView({ behavior: "smooth", block: "start" });
                    break;
                default:
                    break;
            }
            clickedButton.disabled = true;
        });
    });

    const hideSwitchContentOnLoad = () => {
        if (window.scrollY > 100) {
            switchTooltipEl.classList.add("display-none");
        }
    };

    // Run now for the common case, and again on load: the browser can restore
    // the scroll position after DOMContentLoaded, so the load pass is the
    // reliable one.
    hideSwitchContentOnLoad();
    window.addEventListener("load", hideSwitchContentOnLoad);

    window.addEventListener('scroll', function handleScroll(event) {

        if (window.scrollY >= 200) {
            switchTooltipEl.classList.add("display-none");
        }

        if (window.scrollY <= 200 && !projectContentTooltip || projectContentTooltip === "false") {
            switchTooltipEl.classList.remove("display-none");
        }

    });

});