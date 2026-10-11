document.addEventListener("DOMContentLoaded", () => {
    // Homepage only.
    const onHomepage = window.location.pathname === "/" || window.location.pathname === "/index";
    if (!onHomepage) return;

    const btnGroup = document.querySelector("#aboutBtns");
    const aboutContents = document.querySelectorAll(".about-content");
    if (!btnGroup || aboutContents.length < 3) return;

    const buttons = btnGroup.querySelectorAll("button[data-content]");

    // Map each button's data-content value to a content block by document
    // order: about -> first, roles -> second, ai -> third.
    const contentMap = {
        about: aboutContents[0],
        roles: aboutContents[1],
        ai: aboutContents[2],
    };

    const showContent = (key) => {
        // Show only the matching block; hide the rest.
        Object.entries(contentMap).forEach(([name, el]) => {
            if (!el) return;
            el.classList.toggle("display-none", name !== key);
        });

        // Reflect the active button in the group (active one is disabled so it
        // can't be re-clicked, matching the initial markup).
        buttons.forEach((btn) => {
            const isActive = btn.dataset.content === key;
            btn.dataset.active = String(isActive);
            btn.disabled = isActive;
        });
    };

    buttons.forEach((btn) => {
        btn.addEventListener("click", () => showContent(btn.dataset.content));
    });

    // Apply the initial state on load based on the pre-marked active button.
    const initial = btnGroup.querySelector('button[data-active="true"]') || buttons[0];
    if (initial) showContent(initial.dataset.content);
});
