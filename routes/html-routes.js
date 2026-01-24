const path = require('path');

module.exports = (app) => {

    app.get('/', (req, res) => {
        res.render('index', { title: 'Human Centered Design and Differentiation | RojoRevolution' });
    });

    app.get('/index', (req, res) => {
        res.render('index', { title: 'Human Centered Design and Differentiationt | RojoRevolution' });
    });

}