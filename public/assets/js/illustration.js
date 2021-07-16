const lowQimages = [
    '/assets/images/interior/azw-illustration/lazy/DHW_Papa.jpg',
    '/assets/images/interior/azw-illustration/lazy/DHW_Screaming.jpg',
    '/assets/images/interior/azw-illustration/lazy/CobraBlood.jpg',
    '/assets/images/interior/azw-illustration/lazy/PicketPost.jpg',
    '/assets/images/interior/azw-illustration/lazy/tropicalstorm.jpg',
    '/assets/images/interior/azw-illustration/lazy/BrutalNature.jpg',
    '/assets/images/interior/azw-illustration/lazy/ElJefe.jpg',
    '/assets/images/interior/azw-illustration/lazy/BigHorn.jpg',
    '/assets/images/interior/azw-illustration/lazy/hellsgate.jpg',
    '/assets/images/interior/azw-illustration/lazy/7years.jpg',
    '/assets/images/interior/azw-illustration/lazy/5years.jpg',
    '/assets/images/interior/azw-illustration/lazy/4years.jpg',
    '/assets/images/interior/azw-illustration/lazy/killthekeg.jpg',
    '/assets/images/interior/azw-illustration/lazy/burgermonday.jpg',
    '/assets/images/interior/azw-illustration/lazy/tacotuesday.jpg',
    '/assets/images/interior/azw-illustration/lazy/ontheroad.jpg',
]


const images = [
    '/assets/images/interior/azw-illustration/DHW_Papa.png',
    '/assets/images/interior/azw-illustration/DHW_Screaming.png',
    '/assets/images/interior/azw-illustration/CobraBlood.png',
    '/assets/images/interior/azw-illustration/PicketPost.png',
    '/assets/images/interior/azw-illustration/tropicalstorm.png',
    '/assets/images/interior/azw-illustration/BrutalNature.png',
    '/assets/images/interior/azw-illustration/ElJefe.png',
    '/assets/images/interior/azw-illustration/BigHorn.png',
    '/assets/images/interior/azw-illustration/hellsgate.png',
    '/assets/images/interior/azw-illustration/7years.png',
    '/assets/images/interior/azw-illustration/5years.png',
    '/assets/images/interior/azw-illustration/4years.png',
    '/assets/images/interior/azw-illustration/killthekeg.png',
    '/assets/images/interior/azw-illustration/burgermonday.png',
    '/assets/images/interior/azw-illustration/tacotuesday.png',
    '/assets/images/interior/azw-illustration/ontheroad.png',
]

const containerEL = document.getElementById('vectors')


document.addEventListener("DOMContentLoaded", () => {

    const renderLogos = () => {
        for (let i = 0; i < images.length; i++) {
            const img = document.createElement('img');
            img.setAttribute('class', 'img-size disp-inline lazyload');
            // img.setAttribute('src', '/assets/images/loader.gif');
            img.setAttribute('src', lowQimages[i]);
            img.setAttribute('data-src', images[i]);
            containerEL.appendChild(img);
        }
    }

    renderLogos();




});