document.addEventListener("DOMContentLoaded", () => {
    const artworkShowcaseDiv = document.querySelector('[data-target="showcase"]');
    const canImagesContainer = document.querySelector('[data-target="can-controls"]');
    const scrollCanButtons = document.querySelectorAll('[data-btn-action]');
    const scrollLeftButtonDiv = document.querySelector('.move-left-container');
    const scrollRightButtonDiv = document.querySelector('.move-right-container');
    let canContainerPosition = canImagesContainer.getBoundingClientRect();

    // Total count of data elements
    let totalCanImages;
    // Stores JSON Response
    let imgData;

    // Fetch JSON then run functions to add content
    fetch('/assets/data/labels.json', {
        method: 'GET'
    }).then((response) => {
        response.json().then((jsonResponse) => {
            imgData = jsonResponse;
            // console.log(imgData)
            totalCanImages = Object.keys(imgData).length;
            // console.log(totalCanImages)
            generateHTML(totalCanImages);
        });
    }).catch((err) => {
        console.log(`Error: ${err}`)
    });


    // Function creates divs and images and inserts them
    const createPanel = (imgName, imgSrcDefault, artworkSrc, imgAlt, topPos, maxWidth) => {
        // Create Div for Can Image
        const newDiv = document.createElement("div");
        newDiv.setAttribute("data-can", imgName);
        newDiv.setAttribute("id", imgName);
        newDiv.classList.add("width-100");
        if (imgName == "powerFades") {
            newDiv.setAttribute("data-selected", "true");
        } else {
            newDiv.setAttribute("data-selected", "false");
        }

        // Create Can Image
        const newImgDefault = document.createElement("img");
        newImgDefault.style.maxWidth = "100px";
        newImgDefault.setAttribute("src", imgSrcDefault);
        // Append HTML for Can Image
        canImagesContainer.appendChild(newDiv);
        newDiv.appendChild(newImgDefault);

        // Create Elements for Artwork Images
        const newArtworkImg = document.createElement("img");
        newArtworkImg.setAttribute("data-artwork", imgName);
        newArtworkImg.setAttribute("id", imgName);
        // Hide All Images
        newArtworkImg.classList.add("display-none");
        newArtworkImg.classList.add("hide-img");
        // Show only the first image in the controls
        if (imgName == "powerFades") {
            newArtworkImg.classList.add("display-block");
            newArtworkImg.classList.add("show-img");
        }

        newArtworkImg.setAttribute("src", artworkSrc);
        // Append HTML for Artwork Image
        artworkShowcaseDiv.appendChild(newArtworkImg);
    }


    // Function runs loop based on JSON object length
    const generateHTML = (totalImageElements) => {
        for (let i = 0; i < totalImageElements; i++) {
            let objKeys = Object.keys(imgData);
            let currentImg = objKeys[i];
            let canImg = imgData[currentImg]["canImage"];
            let labelImg = imgData[currentImg]["labelImage"];
            createPanel(currentImg, canImg, labelImg);
        }
    }


    const hideScrollButtons = (buttonClicked) => {
        console.log("Button Clicked: ", buttonClicked)
        let updatedContainerPosition = canImagesContainer.getBoundingClientRect();
        console.log("Updated Position: ", updatedContainerPosition);

        if (buttonClicked == "move-right" && updatedContainerPosition.left <= 0 && !scrollLeftButtonDiv.classList.contains('scale-normal')) {
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

    // Event Listener for both buttons that scoll the can selection
    scrollCanButtons.forEach((btn) => {
        btn.addEventListener("click", (evt) => {
            let target = evt.currentTarget
            evt.preventDefault();
            evt.stopPropagation();
            let currentBtn = target.getAttribute('data-btn-action');
            let canContainerPosition = canImagesContainer.getBoundingClientRect();

            switch (currentBtn) {
                case 'move-right':
                    canImagesContainer.style.left = canContainerPosition.left - 300 + "px";
                    hideScrollButtons(currentBtn);
                    break;
                case 'move-left':
                    canImagesContainer.style.left = canContainerPosition.left + 300 + "px";
                    hideScrollButtons(currentBtn);
                    break;
                default:
                    break;
            }


        })
    });

});
// Wait for everything to load in order to grab the dynamic image selectors
window.addEventListener("load", () => {
    console.log("Window Loaded");
    const canElements = document.querySelectorAll('[data-can]');
    const allArtworkImages = document.querySelectorAll('[data-artwork]');


    // Function hides and display the appropriate images
    const displayArtworkImage = (activeArtwork) => {
        // Remove classes that show the artwork from all images
        let currentArtworkEl = document.querySelector(`[data-artwork="${activeArtwork}"]`);

        // console.log("Variable Passed: ", activeArtwork);
        allArtworkImages.forEach((img) => {
            // img.classList.remove('show-img');
            img.style.opacity = 0;

            img.classList.remove('display-block');
        });
        currentArtworkEl.classList.add('display-block');
        setTimeout(() => {
            // currentArtworkEl.classList.add('show-img');
            currentArtworkEl.style.opacity = 1;
        }, 100);
    }

    // Event listener for the can selection buttons
    canElements.forEach((can) => {
        can.addEventListener("click", (evt) => {
            console.log("CAN CLICKED")
            let target = evt.currentTarget
            evt.preventDefault();
            evt.stopPropagation();
            let currentCan = target.getAttribute('data-can');
            console.log("Clan Clicked: ", currentCan);

            canElements.forEach((img) => {
                img.setAttribute('data-selected', 'false');
            });

            target.setAttribute('data-selected', 'true');


            displayArtworkImage(currentCan);
        })
    })

});