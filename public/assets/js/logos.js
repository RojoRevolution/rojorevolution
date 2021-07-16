const logoURLs = [
    '/assets/images/interior/azw-logos/BarelywineBarleywine.gif',
    '/assets/images/interior/azw-logos/OGF.gif',
    '/assets/images/interior/azw-logos/coffeeblack.gif',
    '/assets/images/interior/azw-logos/muirsmure.png',
    '/assets/images/interior/azw-logos/estrella.png',
    '/assets/images/interior/azw-logos/trigo.png',
    '/assets/images/interior/azw-logos/shadesofcitrus.png',
    '/assets/images/interior/azw-logos/brutalnature.png',
    '/assets/images/interior/azw-logos/skullvalley.png',
    '/assets/images/interior/azw-logos/woolsey.png',
    '/assets/images/interior/azw-logos/bighorn.png',
    '/assets/images/interior/azw-logos/campcoolship.png',
    '/assets/images/interior/azw-logos/chefinspired.png',
    '/assets/images/interior/azw-logos/chocolatebunny.png',
    '/assets/images/interior/azw-logos/cold_fashioned.png',
    '/assets/images/interior/azw-logos/dirtyhopwater.png',
    '/assets/images/interior/azw-logos/hellsgate.png',
    '/assets/images/interior/azw-logos/laciudad.png',
    '/assets/images/interior/azw-logos/leadjam.png',
    '/assets/images/interior/azw-logos/loveitlikeitsyours.png',
    '/assets/images/interior/azw-logos/marchfororange.png',
    '/assets/images/interior/azw-logos/newbrood.png',
    '/assets/images/interior/azw-logos/picketpost.png',
    '/assets/images/interior/azw-logos/refuge.png',
    '/assets/images/interior/azw-logos/regionsauvage.png',
    '/assets/images/interior/azw-logos/sangiocervexa.png',
    '/assets/images/interior/azw-logos/sonorawhite.png',
    '/assets/images/interior/azw-logos/tropicalstorm.png',
    '/assets/images/interior/azw-logos/watermelongose.png',
    '/assets/images/interior/azw-logos/whitecanyon.png',
    '/assets/images/interior/azw-logos/babo.png',
    '/assets/images/interior/azw-logos/bearwallow.png',
]

const ulBlock = document.getElementById('logos')


document.addEventListener("DOMContentLoaded", () => {

    const renderLogos = () => {
        for (let logo of logoURLs) {
            const list = document.createElement('li')
            list.setAttribute('data-aos', 'fade-up');
            list.setAttribute('class', 'disp-inline m-3 p-2');
            const img = document.createElement('img');
            img.setAttribute('class', 'img-size');
            img.setAttribute('src', logo);
            ulBlock.appendChild(list);
            list.appendChild(img);
        }
    }

    renderLogos();




});