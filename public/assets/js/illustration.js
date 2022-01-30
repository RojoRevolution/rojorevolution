const lowQimages = '/assets/images/interior/illustrations/loader_small.gif'

const images = [
    '/assets/images/interior/illustrations/eljefe.png',
    '/assets/images/interior/illustrations/elbonito.png',
    '/assets/images/interior/illustrations/screamingforvengeance.png',
    '/assets/images/interior/illustrations/picketpostpils.png',
    '/assets/images/interior/illustrations/brutalnature.png',
    '/assets/images/interior/illustrations/skullvalley.png',
    '/assets/images/interior/illustrations/pariapils.png',
    '/assets/images/interior/illustrations/leggomyego.png',
    '/assets/images/interior/illustrations/mother.png',
    '/assets/images/interior/illustrations/papadontpreach.png',
    '/assets/images/interior/illustrations/citrusvalley.png',
    '/assets/images/interior/illustrations/laciudad.png',
    '/assets/images/interior/illustrations/humankindness.png',
    '/assets/images/interior/illustrations/bighorn.png',
    '/assets/images/interior/illustrations/hellsgatehelles.png',
    '/assets/images/interior/illustrations/cobrablood.png',
    '/assets/images/interior/illustrations/nothingbecomesher.png',
    '/assets/images/interior/illustrations/marstosirius.png',
    '/assets/images/interior/illustrations/thewildernessact.png',
    '/assets/images/interior/illustrations/cactuspalace.png',
    '/assets/images/interior/illustrations/empressrising.png',
    '/assets/images/interior/illustrations/burgermonday.png',
    '/assets/images/interior/illustrations/tacotuesday.png',
    '/assets/images/interior/illustrations/ontheroad.png',
    '/assets/images/interior/illustrations/4years.png',
    '/assets/images/interior/illustrations/5years.png',
    '/assets/images/interior/illustrations/7years.png',
]

const exceptContent = [
    'Primary artwork created by <a href="https://www.instagram.com/breeze1phx/?hl=en" target="_blank" style="color:white; text-decoration:underline;">Breeze.</a> <br>Digitization and label design by RojoRevolution.',
    'Background pattern for label provided by <a href="https://cobraarcadebar.com/" target="_blank" style="color:white; text-decoration:underline;">Cobra Arcade</a> team'
]

const containerEL = document.getElementById('vectors')


document.addEventListener("DOMContentLoaded", () => {

    const renderLogos = () => {
        for (let i = 0; i < images.length; i++) {
            const img = document.createElement('img');
            const div = document.createElement('div');
            div.setAttribute('class', 'position-relative')
            // div.setAttribute('id', images[i].slice(38, -4));
            img.setAttribute('class', 'img-size lazyload');
            // img.setAttribute('src', '/assets/images/loader.gif');
            img.setAttribute('src', lowQimages);
            img.setAttribute('data-src', images[i]);
            containerEL.appendChild(div);
            div.appendChild(img);
            // console.log(img.getAttribute('data-src').slice(38, -4))
            if (img.getAttribute('data-src').slice(38, -4) === 'laciudad' || img.getAttribute('data-src').slice(38, -4) === 'cobrablood') {
                div.setAttribute('id', images[i].slice(38, -4));
            }
        }
        addExcerpt()
    }

    const addExcerpt = () => {
        laCiudadEl = document.getElementById('laciudad');
        cobraBloodEl = document.getElementById('cobrablood');

        for (let i = 0; i < exceptContent.length; i++) {
            const div = document.createElement('div')
            div.setAttribute("class", 'excerpt')
            div.innerHTML += exceptContent[i]
            switch (i) {
                case 0:
                    laCiudadEl.appendChild(div);
                    break;
                case 1:
                    cobraBloodEl.appendChild(div);
                    break;
            }
        }
    }

    renderLogos();




});