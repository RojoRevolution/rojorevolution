document.addEventListener("DOMContentLoaded", () => {

    const menuEl = document.getElementById('menu');
    const openMenuEl = document.querySelector('.logo');
    const closeMenuEl = document.querySelector('.close-menu');
    const navItems = document.getElementById("nav-items");

    let currentMenuStatus
    currentMenuStatus = menuEl.getAttribute("data-menu-status");
    console.log(currentMenuStatus)

    openMenuEl.addEventListener("click", () => {
        console.log("Click")
        currentMenuStatus = menuEl.getAttribute('data-menu-status');
        menuEl.setAttribute('data-menu-status', 'open');
        navItems.classList.toggle('show');
    })

    closeMenuEl.addEventListener("click", () => {
        console.log("click");
        menuEl.setAttribute('data-menu-status', 'closed');
    })
});