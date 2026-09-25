document.addEventListener("DOMContentLoaded", () => {

    const getThemeFromElement = document.querySelector('[data-theme]');
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
            generateHTML(totalImageElements);

        });
    }).catch((err) => {
        console.log(`Error: ${err}`)
    });

    // Function creates divs and images and inserts them
    const createPanel = (imgName, imgSrcDefault, imgSrcInverse, imgAlt, topPos, maxWidth) => {
        // Create a Tag
        const newATag = document.createElement("a");
        newATag.setAttribute('href', "#" + imgName)

        // Create Div
        const newDiv = document.createElement("div");
        newDiv.setAttribute("data-logo", imgName);
        newDiv.setAttribute("id", imgName);
        newDiv.style.top = topPos + "px";
        logoPanels = document.querySelectorAll('[data-logo]')

        // Create Image Default Logo
        const newImgDefault = document.createElement("img");
        newImgDefault.classList.add("width-100");
        newImgDefault.setAttribute("src", imgSrcDefault);
        newImgDefault.setAttribute("alt", imgAlt);
        newImgDefault.setAttribute("data-img-theme", "default");
        newImgDefault.style.maxWidth = maxWidth;
        // Create Image Inverse Logo
        const newImgInverse = document.createElement("img");
        newImgInverse.classList.add("width-100");
        newImgInverse.setAttribute("src", imgSrcInverse);
        newImgInverse.setAttribute("alt", imgAlt);
        newImgInverse.setAttribute("data-img-theme", "inverse");
        newImgInverse.style.maxWidth = maxWidth;

        // Append HTML
        showcaseDiv.appendChild(newDiv);
        newDiv.appendChild(newImgDefault);
        newDiv.appendChild(newImgInverse);

        // Get element position
        let elemPositions = newDiv.getBoundingClientRect();
        let elemTop = elemPositions.top;
        // console.log("Elem Top: ", elemTop)

        // newDiv.setAttribute('data-pos', elemTop)
    }

    // Function runs loop based on JSON object length
    const generateHTML = (totalImageElements) => {
        for (let i = 0; i < totalImageElements; i++) {
            let objKeys = Object.keys(imgData);
            // Add 8 to each panels top position
            topPos = topPos + 8;
            let currentImg = objKeys[i];
            let defaultImg = imgData[currentImg]["default"];
            let InverseImg = imgData[currentImg]["inverse"];
            let currentAlt = imgData[currentImg]["alt"];
            let maxWidth = imgData[currentImg]["maxWidth"];

            createPanel(currentImg, defaultImg, InverseImg, currentAlt, topPos, maxWidth);
        }
    }

});