const path = require('path');

module.exports = (app) => {

    app.get('/', (req, res) => {
        res.render('index', { title: 'Human Centered Design. Off Center Differentiation.' });
    });

    app.get('/index', (req, res) => {
        res.render('index', { title: 'Human Centered Design. Off Center Differentiation.' });
    });

    app.get('/logos', (req, res) => {
        res.render('logos', { title: 'Logo Collection | Identity Design' });
    });

    app.get('/labels', (req, res) => {
        res.render('labels', { title: 'Craft Beer Labels | Illustration & Packaging' });
    });

}