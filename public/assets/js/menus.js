document.addEventListener("DOMContentLoaded", () => {
    const bodyEl = document.body;
    const headerEl = document.getElementById("navHeader");
    const menuBtn = document.getElementById("menuBtn");


    const toggleMenu = (status) => {
        console.log(status);

        if (status === "open") {
            headerEl.setAttribute("data-menu-status", "closed");
            menuBtn.setAttribute("data-menu-status", "closed");
            headerEl.classList.remove("bg-blur");
            bodyEl.classList.remove("overflow-hidden");
            menuBtn.innerHTML = "Main Menu";

        }
        if (status === "closed") {
            headerEl.setAttribute("data-menu-status", "open");
            menuBtn.setAttribute("data-menu-status", "open");
            headerEl.classList.add("bg-blur");
            bodyEl.classList.add("overflow-hidden");
            menuBtn.innerHTML = "Close Menu";
        }
    }

    menuBtn.addEventListener("click", (e) => {
        e.preventDefault();
        let menuStatus = e.currentTarget.getAttribute("data-menu-status");


        toggleMenu(menuStatus);
    })

});