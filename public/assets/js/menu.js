document.addEventListener("DOMContentLoaded", () => {
    // Color Theme Elements
    const bodyEl = document.body;
    const lightSwitchBox = document.querySelector('.light-switch-box');
    const filmEffectBG = document.querySelector('.film-effect-bg');
    const clickEl = document.querySelector('.click-sound');
    const lightRays = document.querySelectorAll('.rays');
    const lightSwitches = document.querySelectorAll('.lightswitch');

    // Navigation Menu Elements
    const topMenus = document.querySelectorAll('[data-menu-type]');
    const menuEl = document.getElementById('menu');
    const lightSwitchEl = document.getElementById('light-switch');
    const menuText = document.querySelector('.menu-btn');
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


    // Theme Switch Functions

    let animateLightRays = (targetLightRayDivs) => {
        targetLightRayDivs.forEach((ray) => {
            let rayCount = ray.getAttribute('data-ray-count');
            switch (rayCount) {
                case "1":
                    ray.classList.add('grow-even');
                    setTimeout(() => {
                        ray.classList.remove("grow-even")
                    }, 500)
                    break;
                case "2":
                    ray.classList.add('grow-odd');
                    setTimeout(() => {
                        ray.classList.remove("grow-odd")
                    }, 500)
                    break;
                case "3":
                    ray.classList.add('grow-even');
                    setTimeout(() => {
                        ray.classList.remove("grow-even")
                    }, 500)
                    break;
                case "4":
                    ray.classList.add('grow-odd');
                    setTimeout(() => {
                        ray.classList.remove("grow-odd")
                    }, 500)
                    break;
                default:
                    break;
            };
        });
    }

    // Event Listener for Theme Lightswitch

    lightSwitches.forEach((lightSwitch) => {
        lightSwitch.addEventListener("click", (evt) => {
            let lightSwitchContainter = evt.currentTarget;
            console.log("currentTarget :", lightSwitchContainter);
            let activeSwitch = evt.currentTarget.getAttribute('data-switch-type')
            console.log("Switch Pulled ", activeSwitch);

            let themeStatus = bodyEl.getAttribute('data-theme');
            let currentLightSwitchBox = lightSwitchContainter.querySelector('.light-switch-box');
            let currentClickEl = lightSwitchContainter.querySelector('.click-sound')
            let currentTargetRays = lightSwitchContainter.querySelectorAll('.rays')

            console.log(currentLightSwitchBox)
            console.log(currentClickEl)
            switch (activeSwitch) {
                case "theme":
                    switch (themeStatus) {
                        case 'light':
                            currentLightSwitchBox.classList.add("pull");
                            currentClickEl.classList.add("show-click");
                            bodyEl.setAttribute('data-theme', 'dark');
                            setTimeout(() => {
                                currentLightSwitchBox.classList.remove("pull");
                                currentClickEl.classList.remove("show-click");
                            }, 500)
                            animateLightRays(currentTargetRays);
                            break;
                        case 'dark':
                            currentLightSwitchBox.classList.add("pull");
                            currentClickEl.classList.add("show-click");

                            bodyEl.setAttribute('data-theme', 'light');
                            setTimeout(() => {
                                currentLightSwitchBox.classList.remove("pull");
                                currentClickEl.classList.remove("show-click");
                            }, 500);
                            animateLightRays(currentTargetRays);
                            break;
                        default:
                            break
                    }
                    break;
                case "film":
                    filmEffectBG.classList.toggle("display-none");
                    currentLightSwitchBox.classList.add("pull");
                    currentClickEl.classList.add("show-click");

                    setTimeout(() => {
                        currentLightSwitchBox.classList.remove("pull");
                        currentClickEl.classList.remove("show-click");
                    }, 500);
                    animateLightRays(currentTargetRays);
                    break;
                default:
                    break;

            }

        });
    }

    )


    // lightSwitchEl.addEventListener("click", (evt) => {
    //     lightSwitchContainter = evt.currentTarget;
    //     console.log("Event Target ", lightSwitchContainter);
    //     animationTargetEl = lightSwitchContainter.children.firstElementChild;
    //     console.log("Target ", lightSwitchBox);

    //     let themeStatus = bodyEl.getAttribute('data-theme');
    //     console.log("Body Theme Status ", themeStatus);

    //     switch (themeStatus) {
    //         case 'light':
    //             // lightSwitchBox.style.animationName = "dummy-pull"
    //             lightSwitchBox.classList.add("pull");
    //             clickEl.classList.add("show-click");
    //             bodyEl.setAttribute('data-theme', 'dark');
    //             setTimeout(() => {
    //                 lightSwitchBox.classList.remove("pull");
    //                 clickEl.classList.remove("show-click");
    //             }, 500)
    //             animateLightRays();
    //             break;
    //         case 'dark':
    //             lightSwitchBox.classList.add("pull");
    //             clickEl.classList.add("show-click");

    //             // lightSwitchBox.style.animationName = "dummy-pull"
    //             bodyEl.setAttribute('data-theme', 'light');
    //             // lightSwitchBox.style.animationName = "pull-switch"
    //             setTimeout(() => {
    //                 lightSwitchBox.classList.remove("pull");
    //                 clickEl.classList.remove("show-click");
    //             }, 500);
    //             animateLightRays();

    //             break;
    //         default:
    //             break
    //     }
    // });

});