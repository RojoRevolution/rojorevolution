document.addEventListener("DOMContentLoaded", () => {
    // Homepage only.
    const onHomepage = window.location.pathname === "/" || window.location.pathname === "/index";
    if (!onHomepage) return;

    const aboutSwitch = document.querySelector("#about-switch input");
    const aboutContents = document.querySelectorAll(".about-content");
    if (!aboutSwitch || aboutContents.length < 2) return;

    const [firstContent, secondContent] = aboutContents;

    const syncAboutContent = () => {
        if (aboutSwitch.checked) {
            // Switch ON: hide the first block, show the second (TL;DR).
            firstContent.classList.add("display-none");
            secondContent.classList.remove("display-none");
        } else {
            // Switch OFF: show the first block, hide the second.
            firstContent.classList.remove("display-none");
            secondContent.classList.add("display-none");
        }
    };

    aboutSwitch.addEventListener("change", syncAboutContent);
    // Apply the correct state on load in case the browser restored a checked
    // state across a refresh.
    syncAboutContent();
});
