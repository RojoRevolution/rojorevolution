document.addEventListener("DOMContentLoaded", () => {


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
    const createPanel = (imgName, imgSrc, imgAlt, topPos, maxWidth) => {
        // Create a Tag
        const newATag = document.createElement("a");
        newATag.setAttribute('href', "#" + imgName)

        // Create Div
        const newDiv = document.createElement("div");
        newDiv.classList.add("panel");
        newDiv.classList.add("logo");
        // newDiv.classList.add("scale-add-1");
        newDiv.setAttribute("data-logo", imgName);
        newDiv.setAttribute("id", imgName);
        // newDiv.setAttribute("data-top-pos", topPos);
        newDiv.style.background = imgData[imgName]["bg"];
        newDiv.style.top = topPos + "px";
        logoPanels = document.querySelectorAll('[data-logo]')

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
            let currentSrc = imgData[currentImg]["src"];
            let currentAlt = imgData[currentImg]["alt"];
            let maxWidth = imgData[currentImg]["maxWidth"];

            createPanel(currentImg, currentSrc, currentAlt, topPos, maxWidth);
        }
    }

});