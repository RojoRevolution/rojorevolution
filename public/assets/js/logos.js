document.addEventListener("DOMContentLoaded", () => {

    const logoPanels = document.querySelectorAll("[data-logo]");
    const logoImages = document.querySelectorAll("[data-img-type]");
    const showcaseDiv = document.querySelector('[data-target="showcase"]');
    let topPos = 70;

    let totalImageElements;
    let imgData;

    // fetch JSON then run functions to add content
    fetch('/assets/data/logos.json', {
        method: 'GET'
    }).then((response) => {
        response.json().then((jsonResponse) => {
            // console.log(jsonResponse)
            imgData = jsonResponse;
            totalImageElements = Object.keys(imgData).length;
            console.log(imgData);
            generateHTML(totalImageElements);
        });
    }).catch((err) => {
        console.log(`Error: ${err}`)
    });

    // Function creates divs and images and inserts them
    const createPanel = (imgName, imgSrc, imgAlt, topPos, maxWidth) => {
        // Create Div
        const newDiv = document.createElement("div");
        newDiv.classList.add("panel");
        newDiv.classList.add("logo");
        newDiv.setAttribute("data-logo", imgName);
        newDiv.setAttribute("id", imgName);
        newDiv.style.background = imgData[imgName]["bg"];
        newDiv.style.top = topPos + "px";
        // Create Image
        const newImg = document.createElement("img");
        newImg.classList.add("width-100");
        newImg.setAttribute("src", imgSrc);
        newImg.setAttribute("alt", imgAlt);
        newImg.style.maxWidth = maxWidth;

        // Switch case for image that require opacity blend mode
        switch (imgName) {
            case "bwbw":
                newImg.classList.add("img-multiply")
                break;
            case "oldgrowth":
                newImg.classList.add("img-multiply")
                break;
            case "cbwn":
                newImg.classList.add("img-multiply")
                break;
            default:
                break;
        }
        // Append HTML
        showcaseDiv.appendChild(newDiv);
        newDiv.appendChild(newImg);
    }

    // Function runs loop based on JSON object length
    const generateHTML = (totalImageElements) => {
        for (let i = 0; i < totalImageElements; i++) {
            let objKeys = Object.keys(imgData);
            // Add 8 to each panels top position
            topPos = topPos + 8;

            let currentImg = objKeys[i];
            let currentSrc = imgData[currentImg]["src"];
            let currentAlt = imgData[currentImg]["alt"];
            let maxWidth = imgData[currentImg]["maxWidth"];

            createPanel(currentImg, currentSrc, currentAlt, topPos, maxWidth);
        }
    }

    console.log(logoPanels)

    logoPanels.forEach((panel) => {
        panel.addEventListener('click', (evt) => {
            console.log(evt.target)
            console.log("CLICK")
        })
    })



});