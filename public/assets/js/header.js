document.addEventListener("DOMContentLoaded", () => {

    function findPos(obj) {
        var curtop = 0;
        if (obj.offsetParent) {
            do {
                curtop += obj.offsetTop;
            } while (obj = obj.offsetParent);
            return [curtop];
        }
    }


    const header = document.getElementById('mainHeader');
    const introNav = document.getElementById('navIntro');
    const contentNav = document.getElementById('navContent');
    const logoWhite = document.getElementById('logoWhite');
    const logoRed = document.getElementById('logoRed');
    const menu = document.getElementById('menu');
    const whiteMenuEl = document.getElementById('introMenu');
    const redMenuEl = document.getElementById('contentMenu');
    const closeBtn = document.querySelector('.close-btn');
    const closeElement = document.getElementById('menu');

    const headerBgWhite = () => {
        header.style.backgroundColor = "rgba(255,255,255,1)";
        introNav.classList.add('hide');
        logoWhite.classList.add('hide');
        contentNav.classList.remove('hide');
        logoRed.classList.remove('hide');
        whiteMenuEl.classList.add('hide');
        redMenuEl.classList.remove('hide');
        closeElement.classList.add('hide')
    }

    const headerNoBg = () => {
        header.style.backgroundColor = "rgba(255,255,255,0)";
        introNav.classList.remove('hide')
        logoWhite.classList.remove('hide');
        contentNav.classList.add('hide')
        logoRed.classList.add('hide');
        whiteMenuEl.classList.remove('hide');
        redMenuEl.classList.add('hide');
        closeElement.classList.remove('bg-red')
    }

    if (document.title === 'About RojoRevolution' || document.title === 'Design Projects' || document.title === 'Web Development Projects') {
        headerBgWhite();
    } else {
        window.addEventListener('scroll', () => {
            if (window.scrollY >= 805) {
                headerBgWhite();
            }
            if (window.scrollY <= 805) {
                headerNoBg();
            }
        })
    }

    menu.addEventListener('click', () => {
        document.getElementById("mySidenav").style.width = "100%";
    })

    closeBtn.addEventListener('click', () => {
        document.getElementById("mySidenav").style.width = "0";
    })

})