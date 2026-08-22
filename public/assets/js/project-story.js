document.addEventListener("DOMContentLoaded", () => {
    const projectWorkSection = document.getElementById("work");
    const projectStorySection = document.getElementById("projectStory");
    const storyButtonEl = document.querySelectorAll("#storyBtn button");

    const removeDisabledFromAllBtns = () => {
        storyButtonEl.forEach((button) => {
            button.setAttribute("data-active", "false");
            button.disabled = false;
        })

    }


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
                    break;
                case "story":
                    projectWorkSection.setAttribute("data-status", "hide");
                    projectStorySection.setAttribute("data-status", "open");
                    break;
                default:
                    break;
            }

            clickedButton.disabled = true;
        });
    })

});