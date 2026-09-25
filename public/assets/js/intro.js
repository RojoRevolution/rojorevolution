document.addEventListener("DOMContentLoaded", () => {

    const offTextEl = document.getElementById("offText");
    const centerTextEl = document.getElementById("centerText");

    let removeAnimation = () => {

    }


    offTextEl.addEventListener("click", () => {
        console.log("OFF Clicked");
        offTextEl.classList.remove("off");
        void offTextEl.offsetWidth;
        offTextEl.classList.add("off");

    });
    centerTextEl.addEventListener("click", () => {
        console.log("CENTER Clicked");
        centerTextEl.classList.remove("center");
        void centerTextEl.offsetWidth;
        centerTextEl.classList.add("center");
    });

});