const path = require('path');

module.exports = (app) => {

    app.get('/', (req, res) => {
        res.render('index', { title: 'Vector Illustration, Design, Differentiation | RojoRevolution' });
    });

    app.get('/index', (req, res) => {
        res.render('index', { title: 'Design, Illustration, Web Development | RojoRevolution' });
    });

}