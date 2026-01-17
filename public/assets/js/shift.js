document.addEventListener("DOMContentLoaded", () => {



    let textHuman = document.querySelector("span.human");
    let jiggleAnimation = document.querySelectorAll("span.jiggle");

    let time; // Variable to store the timeout ID

    let timer = 0;
    let currentStatus;

    let checkTimer = () => {
        // if (timer < 10) {
        //     console.log("Not Currently Idle")
        //     return;
        // }
        // if (timer = 10) {
        //     textHuman.classList.add("slow-shift-top-left");
        //     console.log("===== Idle Effect Started ===== ")
        //     return;
        // }
        // if (timer > 10) {
        //     console.log("User is still Idle")
        //     return;
        // }

        if (timer < 5) {
            currentStatus = "Active User"
        } else if (timer === 5) {
            currentStatus = "Going Idle......"
        } else if (timer > 5) {
            currentStatus = "Idle User"
        }

        switch (currentStatus) {
            case "Active User":
                console.log("Not Currently Idle");
                textHuman.classList.remove("pos-absolute");
                textHuman.classList.remove("shift-top-left");
                break;
            case "Going Idle......":
                console.log("GOING IDLE....");
                textHuman.classList.add("pos-absolute");
                textHuman.classList.add("shift-top-left");
                break;
            case "Idle User":
                console.log("User is NOT active");
                break;
            default:
                console.log("Unknown Status");
                break;
        }
    }


    let incrementNumber = () => {
        checkTimer()
        timer++;
        console.log("Timer: ", timer);
    }


    let timerReset = () => {
        timer = 0
    }

    let resetAnimation = () => {
        textHuman.style.animationName = "none";
        console.log("Amimation Removed")
        textHuman.style.animationName = "shift-top-left";
        console.log("Amimation Added")
    }


    window.onload = resetAnimation; // Reset on page load
    document.onmousemove = resetAnimation; // Reset on mouse movement
    document.onkeydown = resetAnimation;   // Reset on key press
    document.onmousedown = resetAnimation; // Reset on mouse down (e.g., touch screens)
    document.ontouchstart = resetAnimation; // Reset on touch start
    document.onclick = resetAnimation;     // Reset on click
    document.addEventListener('scroll', resetAnimation, true); // Reset on scroll (capture phase)
    window.addEventListener('load', resetAnimation, true); // Another way to reset on load

    // More robust event registration using an array
    var events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach(function (eventName) {
        document.addEventListener(eventName, resetAnimation, true);
    });

    window.onload = () => {
        resetAnimation();
    };








    //     // let inactivityTime = () => {

    //     //     // Function to execute upon inactivity
    //     //     let timedOut = () => {
    //     //         // console.log("Timer ", time)
    //     //         console.log("You have timed out")
    //     //         textHuman.classList.add("slow-shift-top-left");
    //     //         // alert("You have been logged out due to inactivity.");
    //     //         // Uncomment the line below to redirect to a logout page
    //     //         // location.href = 'logout.html';
    //     //     }


    //     //     if (timer = 10) {
    //     //         textHuman.classList.add("slow-shift-top-left");
    //     //     }
    //     //     if (timer > 10) {
    //     //         console.log("Do Nothing")
    //     //     }


    //     //     idler();

    //     //     // Resets the inactivity timer
    //     //     function resetTimer() {
    //     //         // console.log("Reset Timer ", time)
    //     //         textHuman.classList.remove("slow-shift-top-left");

    //     //         timer = 0;

    //     //         // clearTimeout(time); // Clear the previous timer
    //     //         // time = setTimeout(timedOut, 3000); // Set a new timer for 3 seconds (3000 milliseconds)
    //     //     }


    //     //     // Attach event listeners to reset the timer
    //     //     window.onload = resetTimer; // Reset on page load
    //     //     document.onmousemove = resetTimer; // Reset on mouse movement
    //     //     document.onkeydown = resetTimer;   // Reset on key press
    //     //     document.onmousedown = resetTimer; // Reset on mouse down (e.g., touch screens)
    //     //     document.ontouchstart = resetTimer; // Reset on touch start
    //     //     document.onclick = resetTimer;     // Reset on click
    //     //     document.addEventListener('scroll', resetTimer, true); // Reset on scroll (capture phase)
    //     //     window.addEventListener('load', resetTimer, true); // Another way to reset on load

    //     //     // More robust event registration using an array
    //     //     var events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    //     //     events.forEach(function (eventName) {
    //     //         document.addEventListener(eventName, resetTimer, true);
    //     //     });
    //     // };

    //     // // Initialize the inactivity timer when the page loads
    //     // window.onload = function () {
    //     //     inactivityTime();
    //     // };

});