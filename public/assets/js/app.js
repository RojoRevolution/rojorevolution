let currentScreenWidth;

let currentWindowSize = () => {
    //your code here
    //this is just an example
    currentScreenWidth = document.body.clientWidth;
    // height = document.body.clientHeight;
}

document.addEventListener("DOMContentLoaded", function () {

    currentWindowSize();

    window.addEventListener("resize", () => {
        currentWindowSize();
        console.log("Width on Load: ", currentScreenWidth)

    });

    console.log("DOM loaded")
    console.log("Width on Load: ", currentScreenWidth)




});