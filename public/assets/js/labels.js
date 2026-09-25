document.addEventListener("DOMContentLoaded", () => {
    const artworkShowcaseDiv = document.querySelector('[data-target="showcase"]');
    const canImagesContainer = document.querySelector('[data-target="can-controls"]');
    const scrollCanButtons = document.querySelectorAll('[data-btn-action]');
    const scrollLeftButtonDiv = document.querySelector('.move-left-container');
    const scrollRightButtonDiv = document.querySelector('.move-right-container');
    const pickCanTooltipEl = document.querySelector('.point-container[data-type="selectCan"]');
    const viewMoreTooltipEl = document.querySelector('.point-container[data-type="moveRight"]');
    const activelySelectedCanEl = document.querySelector('[data-selected="true"]');

    let canContainerPosition = canImagesContainer.getBoundingClientRect();
    // Below this width, the artwork showcase is hidden (see mediaqueries.css)
    // and cans are just a scrollable gallery, so clicking a can shouldn't select it.
    const mobileLayout = window.matchMedia('(max-width: 768px)');

    let pickCanTooltip;
    let moveRightToolTip;

    const hideTooltips = () => {
        pickCanTooltip = localStorage.getItem('hideCanTooltip');
        moveRightToolTip = localStorage.getItem('hideMoveRightTooltip');

        if (pickCanTooltip === "true") {
            pickCanTooltipEl.classList.add('display-none');
        }
        if (moveRightToolTip === "true") {
            viewMoreTooltipEl.classList.add('display-none');
        }
    }
    hideTooltips();




    // Total count of data elements
    let totalCanImages;
    // Stores JSON Response
    let imgData;

    // Fetch and store JSON data then run functions to add content
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


    // Max empty space (px) allowed between the last can and the edge of the viewport
    const EDGE_GAP = 28;
    // Fixed distance (px) each arrow click moves the can strip
    const SCROLL_STEP = 300;

    // The furthest left the strip is allowed to travel (a large negative number)
    // and the furthest right (always 0, its starting position).
    const getScrollBounds = () => {
        const trackWidth = canImagesContainer.scrollWidth;
        const viewportWidth = canImagesContainer.parentElement.clientWidth;
        const minLeft = Math.min(0, viewportWidth - trackWidth - EDGE_GAP);
        return { minLeft, maxLeft: 0 };
    };

    const hideScrollButtons = (buttonClicked) => {
        let updatedContainerPosition = canImagesContainer.getBoundingClientRect();
        const { minLeft } = getScrollBounds();

        if (buttonClicked == "move-right" && updatedContainerPosition.left <= 0 && !scrollLeftButtonDiv.classList.contains('scale-normal')) {
            scrollLeftButtonDiv.classList.add('scale-normal');
        } else if (buttonClicked == "move-right" && updatedContainerPosition.left <= minLeft && scrollRightButtonDiv.classList.contains('scale-normal')) {
            scrollRightButtonDiv.classList.remove('scale-normal');
        }

        if (buttonClicked == "move-left" && updatedContainerPosition.left >= -SCROLL_STEP && scrollLeftButtonDiv.classList.contains('scale-normal')) {
            scrollLeftButtonDiv.classList.remove('scale-normal');
        } else if (buttonClicked == "move-left" && updatedContainerPosition.left >= minLeft + SCROLL_STEP && !scrollRightButtonDiv.classList.contains('scale-normal')) {
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
            const { minLeft, maxLeft } = getScrollBounds();

            moveRightToolTip = localStorage.setItem('hideMoveRightTooltip', "true");
            hideTooltips();

            switch (currentBtn) {
                case 'move-right':
                    canImagesContainer.style.left = Math.max(canContainerPosition.left - SCROLL_STEP, minLeft) + "px";
                    hideScrollButtons(currentBtn);
                    break;
                case 'move-left':
                    canImagesContainer.style.left = Math.min(canContainerPosition.left + SCROLL_STEP, maxLeft) + "px";
                    hideScrollButtons(currentBtn);
                    break;
                default:
                    break;
            }


        })
    });

    // Function hides and displays the appropriate artwork image
    const displayArtworkImage = (activeArtwork) => {
        let currentArtworkEl = artworkShowcaseDiv.querySelector(`[data-artwork="${activeArtwork}"]`);

        artworkShowcaseDiv.querySelectorAll('[data-artwork]').forEach((img) => {
            img.style.opacity = 0;
            img.classList.remove('display-block');
        });
        currentArtworkEl.classList.add('display-block');
        setTimeout(() => {
            currentArtworkEl.style.opacity = 1;
        }, 100);
    }

    // Delegated event listener for the can selection buttons.
    // Bound to the container (present at DOMContentLoaded) instead of the
    // individual can images (added later, asynchronously, once labels.json
    // resolves) so clicks work regardless of when the cans finish rendering.
    canImagesContainer.addEventListener("click", (evt) => {
        if (mobileLayout.matches) return;

        const target = evt.target.closest('[data-can]');
        if (!target) return;

        evt.preventDefault();
        evt.stopPropagation();
        let currentCan = target.getAttribute('data-can');

        canImagesContainer.querySelectorAll('[data-can]').forEach((img) => {
            img.setAttribute('data-selected', 'false');
        });
        target.setAttribute('data-selected', 'true');

        displayArtworkImage(currentCan);
        pickCanTooltip = localStorage.setItem('hideCanTooltip', "true");
        hideTooltips();
    });

});