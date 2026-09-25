
// This script is loaded from the <head> in order to set the color theme to the initial <HTML> tag and avoid the screen flickering when user preference is a Dark theme.

let htmlEl = document.querySelector('html')

let storedTheme;
storedTheme = localStorage.getItem('theme');
storedFilmEffect = localStorage.getItem('film');

if (storedTheme) {
    currentTheme = storedTheme
    htmlEl.setAttribute('data-theme', storedTheme)
} else {
    htmlEl.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
}

if (storedFilmEffect == 'off') {
    currentTheme = storedTheme
    htmlEl.setAttribute('data-film-effect', storedFilmEffect)
    htmlEl.setAttribute('data-film-effect', 'off');
    localStorage.setItem('film', 'off');
} else {
    htmlEl.setAttribute('data-film-effect', 'on');
    localStorage.setItem('film', 'on');
}


// In-menu theme switch (#theme-switch), shown at <=768px where the pull-chain
// is hidden. This script runs in <head>, so defer wiring until the DOM exists.
// It reads/writes the same data-theme attribute + localStorage('theme') the
// pull-chain uses, so both controls stay consistent.
document.addEventListener('DOMContentLoaded', () => {
    const themeSwitch = document.getElementById('theme-switch');
    if (!themeSwitch) return;

    const buttons = themeSwitch.querySelectorAll('button[data-theme-value]');

    // Reflect the given theme on the buttons: active one is marked + disabled.
    const syncButtons = (theme) => {
        buttons.forEach((btn) => {
            const isActive = btn.getAttribute('data-theme-value') === theme;
            btn.setAttribute('data-active', isActive ? 'true' : 'false');
            btn.disabled = isActive;
        });
    };

    // Match the theme the head script already applied on load.
    syncButtons(htmlEl.getAttribute('data-theme'));

    buttons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const theme = btn.getAttribute('data-theme-value');
            htmlEl.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
            syncButtons(theme);
        });
    });
});
