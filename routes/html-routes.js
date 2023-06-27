const path = require('path');

module.exports = (app) => {

    app.get('/', (req, res) => {
        res.render('index', { title: 'Design, Illustration, Web Development | RojoRevolution' });
    });

    app.get('/index', (req, res) => {
        res.render('index', { title: 'Design, Illustration, Web Development | RojoRevolution' });
    });

    app.get('/design-projects', (req, res) => {
        res.render('design', { title: 'Design Projects' });
    });

    app.get('/dev-projects', (req, res) => {
        res.render('development', { title: 'Web Development Projects' });
    });

    app.get('/design/azw-branding', (req, res) => {
        res.render('azw-branding', { title: 'Branding | Print Design | Arizona Wilderness Brewing Co.' });
    });

    app.get('/design/hideout', (req, res) => {
        res.render('hideout', { title: 'UI | Product Design | Hideout.tv' });
    });

    app.get('/design/adscend-ui', (req, res) => {
        res.render('adscend-ui', { title: 'UI | Product Design | Adscend Media' });
    });

    app.get('/design/azw-logos', (req, res) => {
        res.render('azw-logos', { title: 'Logofolio | Arizona Wilderness Brewing Co.' });
    });

    app.get('/design/azw-illustration', (req, res) => {
        res.render('azw-illustration', { title: 'Illustration | Arizona Wilderness Brewing Co.' });
    });

    app.get('/design/adscendmedia', (req, res) => {
        res.render('adscendmedia', { title: 'Branding and Web Design | Ascend Media' });
    });

    app.get('/design/acopon', (req, res) => {
        res.render('acopon', { title: 'Branding and Print Design | Acopon Brewing Co.' });
    });

    app.get('/about', (req, res) => {
        res.render('about', { title: 'About RojoRevolution' });
    });

    app.get('/chat', (req, res) => {
        res.render('chat-test', { title: 'Chat Test' });
    });

}