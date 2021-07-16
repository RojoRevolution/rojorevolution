document.addEventListener("DOMContentLoaded", () => {
    const bands = [
        { genre: 'Heavy Metal', band: 'Judas Priest' },
        { genre: 'Power Metal', band: 'Blind Guardian' },
        { genre: 'Progressive Rock', band: 'Pink Floyd' },
        { genre: 'Progressive Metal', band: 'Pain of Salvation' },
        { genre: 'Thrash Metal', band: 'Exodus' },
        { genre: 'Doom Metal', band: 'Warning' },
    ];

    const genreEL = document.getElementById('genre')
    const bandEl = document.getElementById('band')
    let randNum;

    const generateNum = () => {
        let arrLength = bands.length;
        let number = Math.floor(Math.random() * arrLength);
        randNum = number;
    }

    const inputText = () => {
        generateNum();
        console.log(randNum)
        genreEL.innerText = bands[randNum].genre;
        bandEl.innerText = bands[randNum].band;
    };

    if (document.title === 'About RojoRevolution') {
        return
    } else {
        inputText();
    };
});