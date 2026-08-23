document.addEventListener("DOMContentLoaded", () => {
    const projectWorkSection = document.getElementById("work");
    const projectStorySection = document.getElementById("projectStory");
    const storyButtonEl = document.querySelectorAll("#storyBtn button");
    const scrollSection = document.querySelector(".scroll-section ")
    const bodyEl = document.querySelector("body");

    console.log(scrollSection);

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
            console.log(clickedButton)
            let content = clickedButton.getAttribute("data-content");
            console.log(content)
            // Set Data Attributes
            removeDisabledFromAllBtns();
            clickedButton.setAttribute("data-active", "true");
            // Show Content
            switch (content) {
                case "work":
                    projectWorkSection.setAttribute("data-status", "show");
                    projectStorySection.setAttribute("data-status", "hide");
                    scrollSection.classList.remove("overflow-auto");
                    // bodyEl.classList.remove("lock-scroll");
                    break;
                case "story":
                    projectWorkSection.setAttribute("data-status", "hide");
                    projectStorySection.setAttribute("data-status", "show");
                    scrollSection.classList.add("overflow-auto");
                    // bodyEl.classList.add("lock-scroll");
                    break;
                default:
                    break;
            }

            clickedButton.disabled = true;
        });
    });

    // window.addEventListener('wheel', (e) => {
    //     const atBottom = scrollSection.scrollTop + scrollSection.clientHeight >= scrollSection.scrollHeight;
    //     const atTop = scrollSection.scrollTop === 0;

    //     if ((!atBottom && e.deltaY > 0) || (!atTop && e.deltaY < 0)) {
    //         scrollSection.scrollTop += e.deltaY;
    //         e.preventDefault();
    //     }
    // }, { passive: false });


});