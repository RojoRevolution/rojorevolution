document.addEventListener("DOMContentLoaded", () => {
    const projectWorkSection = document.getElementById("work");
    const projectStorySection = document.getElementById("projectStory");
    const storyButtonEl = document.querySelectorAll("#storyBtn button");
    const scrollSection = document.querySelector(".scroll-section ")
    const storySectionTop = document.getElementById("storyTop");
    // const projectControlsContainer = document.querySelector(".controls-container")
    // const projectViewControls = document.querySelector(".project-view")
    // const projectViewControlsParagraph = document.querySelector(".project-view p")
    const switchTooltipEl = document.querySelector(".point-container");

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
                    switchTooltipEl.classList.add("display-none");
                    storySectionTop.scrollIntoView({ behavior: "smooth", block: "start" });
                    break;
                default:
                    break;
            }
            clickedButton.disabled = true;
        });
    });


});