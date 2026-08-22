document.addEventListener("DOMContentLoaded", () => {
    const projectWorkSection = document.getElementById("work");
    const projectStorySection = document.getElementById("projectStory");
    const storyButtonEl = document.querySelectorAll("#storyBtn button");

    storyButtonEl.forEach((button) => {
        button.addEventListener("click", (event) => {
            // event.preventDefault();
            let buttonClicked = event.target.getAttribute("data-active");

            console.log(buttonClicked);
            console.log("Click");

        });
    })

});