document.addEventListener("DOMContentLoaded", () => {

    const bounceBtn = document.querySelector('.bounce');
    const portfolioSection = document.getElementById('portfolio');
    // Toggle Buttons
    const designWorkBtn = document.getElementById('designWork');
    const devWorkBtn = document.getElementById('devWork');
    // Container holding cards
    const toggleContainer = document.getElementById('toggleContainer')
    const designDIV = document.getElementById('designProjects');
    const devDiv = document.getElementById('devProjects');

    //Function for finding the Y Position of an element
    function findPos(obj) {
        var curtop = 0;
        if (obj.offsetParent) {
            do {
                curtop += obj.offsetTop;
            } while (obj = obj.offsetParent);
            return [curtop];
        }
    }

    bounceBtn.addEventListener('click', () => {
        // Scroll to the y-pos of the portfolioSection
        window.scrollTo(0, findPos(portfolioSection))
    })

    function checkForActive() {
        if (designDIV.classList.contains('active')) {
            console.log("Design List Active")
        } else if (devDiv.classList.contains('active')) {
            console.log("Dev List Active")
        }
    }

    designWorkBtn.addEventListener('click', () => {
        // If button is active Return
        if (designDIV.classList.contains('active')) {
            return
        }
        toggleContainer.style.height = '1150px'
        designDIV.style.left = '0px';
        devDiv.style.right = '-1500px';

        designWorkBtn.classList.toggle('activeDesign');
        devWorkBtn.classList.toggle('activeDev');
        designDIV.classList.toggle('active')
        devDiv.classList.toggle('active')

        checkForActive()


    });

    devWorkBtn.addEventListener('click', () => {
        // If button is active Return
        if (devDiv.classList.contains('active')) {
            return
        }
        toggleContainer.style.height = '1700px'
        designDIV.style.left = '-1500px';
        devDiv.style.right = '0px';

        designWorkBtn.classList.toggle('activeDesign')
        devWorkBtn.classList.toggle('activeDev')
        designDIV.classList.toggle('active')
        devDiv.classList.toggle('active')
        checkForActive()
    });

});