document.addEventListener("DOMContentLoaded", () => {


    const canImagesContainer = document.querySelector('[data-target="can-controls"]');
    const scrollCanButtons = document.querySelectorAll('[data-btn-action]');
    const scrollLeftButtonDiv = document.querySelector('.move-left-container');
    const scrollRightButtonDiv = document.querySelector('.move-right-container');
    let canContainerPosition = canImagesContainer.getBoundingClientRect();

    console.log(canContainerPosition)


    // console.log(firstCan)
    // Total count of data elements
    let totalCanImages;
    // Stores JSON Response
    let imgData;

    // fetch JSON then run functions to add content
    fetch('/assets/data/labels.json', {
        method: 'GET'
    }).then((response) => {
        response.json().then((jsonResponse) => {
            // console.log(jsonResponse)
            imgData = jsonResponse;
            console.log(imgData)
            totalCanImages = Object.keys(imgData).length;
            console.log(totalCanImages)
            generateHTML(totalCanImages);
        });
    }).catch((err) => {
        console.log(`Error: ${err}`)
    });


    // Function creates divs and images and inserts them
    const createPanel = (imgName, imgSrcDefault, imgSrcInverse, imgAlt, topPos, maxWidth) => {
        // Create a Tag
        // const newATag = document.createElement("a");
        // newATag.setAttribute('href', "#" + imgName)

        // Create Div
        const newDiv = document.createElement("div");
        // newDiv.classList.add("panel");
        // newDiv.classList.add("logo");
        // newDiv.classList.add("scale-add-1");
        newDiv.setAttribute("data-can", imgName);
        newDiv.setAttribute("id", imgName);
        newDiv.classList.add("width-100");
        // newDiv.classList.add("absolute");
        // newDiv.classList.add("overflow-x-scroll");

        // newDiv.setAttribute("data-top-pos", topPos);
        // newDiv.style.background = imgData[imgName]["bg"];
        // newDiv.style.top = topPos + "px";
        // logoPanels = document.querySelectorAll('[data-logo]')

        // Create Can Images
        const newImgDefault = document.createElement("img");
        newImgDefault.style.maxWidth = "100px";
        newImgDefault.setAttribute("src", imgSrcDefault);
        // newImgDefault.setAttribute("alt", imgAlt);
        // newImgDefault.setAttribute("data-img-theme", "default");
        // newImgDefault.style.maxWidth = maxWidth;

        // Append HTML
        canImagesContainer.appendChild(newDiv);
        newDiv.appendChild(newImgDefault);

        // Get element position
        // let elemPositions = newDiv.getBoundingClientRect();
        // let elemTop = elemPositions.top;
        // console.log("Elem Top: ", elemTop)

        // newDiv.setAttribute('data-pos', elemTop)
    }


    // Function runs loop based on JSON object length
    const generateHTML = (totalImageElements) => {
        for (let i = 0; i < totalImageElements; i++) {
            let objKeys = Object.keys(imgData);
            // Add 8 to each panels top position
            // topPos = topPos + 8;
            let currentImg = objKeys[i];
            let defaultImg = imgData[currentImg]["canImage"];
            // console.log(defaultImg)
            // let InverseImg = imgData[currentImg]["inverse"];
            // let currentAlt = imgData[currentImg]["alt"];
            // let maxWidth = imgData[currentImg]["maxWidth"];
            // let maxWidth = "300px";
            createPanel(currentImg, defaultImg);
        }
    }


    const hideScrollButtons = (buttonClicked) => {
        // console.log("Container Position: ", containerPosition);
        console.log("Button Clicked: ", buttonClicked)
        let updatedContainerPosition = canImagesContainer.getBoundingClientRect();
        console.log("Updated Position: ", updatedContainerPosition);

        if (buttonClicked == "move-right" && updatedContainerPosition.left <= 0 && !scrollLeftButtonDiv.classList.contains('scale-normal')) {
            // scrollLeftButtonDiv.classList.remove('display-none');
            scrollLeftButtonDiv.classList.add('scale-normal');
        } else if (buttonClicked == "move-right" && updatedContainerPosition.left <= -2101 && scrollRightButtonDiv.classList.contains('scale-normal')) {
            scrollRightButtonDiv.classList.remove('scale-normal');
        }

        if (buttonClicked == "move-left" && updatedContainerPosition.left >= -300 && scrollLeftButtonDiv.classList.contains('scale-normal')) {
            scrollLeftButtonDiv.classList.remove('scale-normal');
        } else if (buttonClicked == "move-left" && updatedContainerPosition.left >= -2700 && !scrollRightButtonDiv.classList.contains('scale-normal')) {
            scrollRightButtonDiv.classList.add('scale-normal');
        }

    }

    // Event Listener for each scroll can button
    scrollCanButtons.forEach((btn) => {
        btn.addEventListener("click", (evt) => {
            let target = evt.currentTarget
            evt.preventDefault();
            evt.stopPropagation();
            // console.log(target);
            let currentBtn = target.getAttribute('data-btn-action');
            let canContainerPosition = canImagesContainer.getBoundingClientRect();
            let updatedContainerPosition

                // console.log(currentBtn);
                // console.log(canContainerPosition);
                ;
            switch (currentBtn) {
                case 'move-right':
                    canImagesContainer.style.left = canContainerPosition.left - 300 + "px";
                    // updatedContainerPosition = canImagesContainer.getBoundingClientRect();
                    // console.log("Move Right");
                    // console.log("Updated Position: ", updatedContainerPosition);

                    // if (updatedContainerPosition.left <= 0 && scrollLeftButtonDiv.classList.contains('display-none')) {
                    //     scrollLeftButtonDiv.classList.remove('display-none');
                    // }
                    hideScrollButtons(currentBtn);
                    break;
                case 'move-left':
                    canImagesContainer.style.left = canContainerPosition.left + 300 + "px";
                    // updatedContainerPosition = canImagesContainer.getBoundingClientRect();
                    // console.log("Move Left");
                    // console.log("Updated Position: ", updatedContainerPosition);

                    // if (updatedContainerPosition.left >= -300 && !scrollLeftButtonDiv.classList.contains('display-none')) {
                    //     scrollLeftButtonDiv.classList.add('display-none');
                    // }
                    hideScrollButtons(currentBtn);


                    break;
                default:
                    break;
            }


        })
    });


});