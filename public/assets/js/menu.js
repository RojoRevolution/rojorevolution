document.addEventListener("DOMContentLoaded", () => {

    const topMenus = document.querySelectorAll('[data-menu-type]');
    const menuEl = document.getElementById('menu');
    const modeEl = document.getElementById('mode');
    const menuText = document.querySelector('.menu-btn');
    // const closeMenuEl = document.querySelector('.close-menu');
    const navItems = document.getElementById("nav-items");

    const colorThemeControl = document.querySelector("[data-theme]");

    let currentMenuStatus
    currentMenuStatus = menuEl.getAttribute("data-menu-status");
    console.log(currentMenuStatus)


    let changeMenuStatus = (targetEl, status) => {

        switch (status) {
            case 'nav-closed':
                console.log("Case Nav Closed")
                menuEl.setAttribute('data-menu-status', 'open');
                targetEl.setAttribute('data-status', 'nav-open');
                navItems.classList.toggle('show');
                targetEl.innerHTML = "Close"
                break;

            case 'nav-open':
                console.log("Case Nav Open")
                menuEl.setAttribute('data-menu-status', 'closed');
                targetEl.setAttribute('data-status', 'nav-closed');
                navItems.classList.toggle('show');
                targetEl.innerHTML = "Menu"
                break;
            case 'light':
                colorThemeControl.setAttribute('data-theme', 'dark');
                targetEl.setAttribute('data-status', 'dark');
                targetEl.innerHTML = "Dark"
                break;
            case 'dark':
                colorThemeControl.setAttribute('data-theme', 'light');
                targetEl.setAttribute('data-status', 'light');
                targetEl.innerHTML = "Light"
                break;
            default:
                break
        }
    }

    topMenus.forEach((menu) => {
        menu.addEventListener("click", (evt) => {
            console.log("Target ", evt.target)
            let eventTarget = evt.target;
            let targetStatus = eventTarget.getAttribute('data-status');
            changeMenuStatus(eventTarget, targetStatus);

        })
    })

});