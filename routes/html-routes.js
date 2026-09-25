const path = require('path');

module.exports = (app) => {

    app.get('/', (req, res) => {
        res.render('index', { title: 'Human Centered Design. Off Center Differentiation. | RojoRevolution' });
    });

    app.get('/index', (req, res) => {
        res.render('index', { title: 'Human Centered Design. Off Center Differentiation. | RojoRevolution' });
    });

    app.get('/logos', (req, res) => {
        res.render('logos', { title: 'Logos Logos Logos | RojoRevolution' });
    });

    app.get('/labels', (req, res) => {
        res.render('labels', { title: 'Craft Beer Label Design | RojoRevolution' });
    });

    app.get('/acoponbrewing', (req, res) => {
        res.render('acopon', { title: 'Acopon Brewing Co. | RojoRevolution' });
    });


}