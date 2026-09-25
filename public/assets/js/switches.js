document.addEventListener("DOMContentLoaded", () => {
    // Color Theme Elements
    const lightSwitchBox = document.querySelector('.light-switch-box');
    const clickEl = document.querySelector('.click-sound');
    const lightRays = document.querySelectorAll('.rays');
    const lightSwitches = document.querySelectorAll('.lightswitch');

    // Theme Toggle Elements
    const topMenus = document.querySelectorAll('[data-menu-type]');
    const lightSwitchEl = document.getElementById('light-switch');

    const colorThemeControl = document.querySelector("[data-theme]");

    // Toggle light/dark theme
    let changeMenuStatus = (targetEl, status) => {
        switch (status) {
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

    // Event Listener for any menu with data-menu-type
    topMenus.forEach((menu) => {
        menu.addEventListener("click", (evt) => {
            let eventTarget = evt.target;
            let targetStatus = eventTarget.getAttribute('data-status');
            changeMenuStatus(eventTarget, targetStatus);

        })
    })


    //  Function controls the light ray animations
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

    // Event Listener for Light Switch Chains
    lightSwitches.forEach((lightSwitch) => {
        lightSwitch.addEventListener("click", (evt) => {
            console.log("click")
            // Get current Target
            let lightSwitchContainter = evt.currentTarget;
            // Get targets attribute - dictactes which chain was pulled
            let activeSwitch = evt.currentTarget.getAttribute('data-switch-type')

            // Color theme
            let themeStatus = colorThemeControl.getAttribute('data-theme');
            // Selects relevant elements based on current target
            let currentLightSwitchBox = lightSwitchContainter.querySelector('.light-switch-box');
            let currentClickEl = lightSwitchContainter.querySelector('.click-sound')
            let currentTargetRays = lightSwitchContainter.querySelectorAll('.rays')


            switch (activeSwitch) {
                // If first chain is pulled change the theme
                case "theme":
                    switch (themeStatus) {
                        case 'light':
                            currentLightSwitchBox.classList.add("pull");
                            currentClickEl.classList.add("show-click");
                            colorThemeControl.setAttribute('data-theme', 'dark');
                            localStorage.setItem('theme', 'dark');
                            setTimeout(() => {
                                currentLightSwitchBox.classList.remove("pull");
                                currentClickEl.classList.remove("show-click");
                            }, 500)
                            animateLightRays(currentTargetRays);
                            break;
                        case 'dark':
                            currentLightSwitchBox.classList.add("pull");
                            currentClickEl.classList.add("show-click");
                            colorThemeControl.setAttribute('data-theme', 'light');
                            localStorage.setItem('theme', 'light');
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
                default:
                    break;

            }

        });
    }

    )
});