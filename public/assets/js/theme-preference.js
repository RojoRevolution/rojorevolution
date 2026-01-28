
// This script is loaded from the <head> in order to set the color theme to the initial <HTML> tag and avoid the screen flickering when user preference is a Dark theme.

let htmlEl = document.querySelector('html')

let storedTheme;
storedTheme = localStorage.getItem('theme');
storedFilmEffect = localStorage.getItem('film');

console.log(storedFilmEffect)

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
