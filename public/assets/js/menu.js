document.addEventListener("DOMContentLoaded", () => {

    const menuEl = document.getElementById('menu');
    let currentMenuStatus
    currentMenuStatus = menuEl.getAttribute("data-menu-status");
    console.log(currentMenuStatus)

    menuEl.addEventListener("click", () => {
        console.log("Click")
        currentMenuStatus = menuEl.getAttribute('data-menu-status');
        switch (currentMenuStatus) {
            case "closed":
                menuEl.setAttribute('data-menu-status', 'open');
                break;
            case "open":
                menuEl.setAttribute('data-menu-status', 'closed');
                break;
            default:
                break;
        }

    })


});