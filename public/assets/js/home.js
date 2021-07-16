document.addEventListener("DOMContentLoaded", () => {

    const bounceBtn = document.querySelector('.bounce');
    const portfolioSection = document.getElementById('portfolio');
    // Toggle Buttons
    const designWorkBtn = document.getElementById('designWork');
    const devWorkBtn = document.getElementById('devWork');
    // Container holding cards
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


    designWorkBtn.addEventListener('click', () => {
        // If button is active Return
        if (designDIV.classList.contains('active')) {
            return
        }
        designDIV.style.left = '0px';
        devDiv.style.right = '-1500px';

        designWorkBtn.classList.toggle('activeDesign');
        devWorkBtn.classList.toggle('activeDev');
        designDIV.classList.toggle('active')
        devDiv.classList.toggle('active')



    });

    devWorkBtn.addEventListener('click', () => {
        // If button is active Return
        if (devDiv.classList.contains('active')) {
            return
        }
        designDIV.style.left = '-1500px';
        devDiv.style.right = '0px';

        designWorkBtn.classList.toggle('activeDesign')
        devWorkBtn.classList.toggle('activeDev')
        designDIV.classList.toggle('active')
        devDiv.classList.toggle('active')
    });

});