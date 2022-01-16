document.addEventListener("DOMContentLoaded", () => {

    let textEl = document.getElementById('intro-text')

    let services = ['designs memorable brands', 'designs user-centric products', 'builds full-stack websites']
    let currentService = '';
    let speed = 50;
    let num = 0;
    // console.log('Array: ', services[1][1])




    const renderText = () => {
        console.log('Function Running');
        // console.log('Current Service: ', currentService);
        for (let i = 0; i < services.length; i++) {

            for (let o = 0; o < services[i].length; o++) {
                // console.log(services[i][o])
                console.log(`${i} || ${o}`)
                currentService += services[i][o];
                // console.log('In the loop: ', currentService)
                setHTML(o)
            }
            console.log('Out of loop: ', currentService)
            clearText(i);

        }
    }

    const setHTML = (o) => {
        setTimeout(function () {
            // console.log(`in Timeout: ${o} `, currentService[o])
            // console.log(currentService)
            // textEl.innerHTML += currentService[o];
            textEl.insertAdjacentHTML('beforeend', currentService[o])
        }, 200 * o)
    }

    const clearText = (i) => {
        // console.log('Clear Text Function')
        setTimeout(() => {
            textEl.innerHTML = '';
        }, 200)

    }


    renderText();
})


