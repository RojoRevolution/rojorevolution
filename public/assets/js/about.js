document.addEventListener("DOMContentLoaded", () => {

    const designSkills = ['Branding', 'Identity Design', 'Illustration', 'Visual Design', 'Product Design', 'Web Design', 'Print Design', 'Art Direciton', 'Storyboarding', 'Rapid Prototyping', 'Animation'
    ];

    const devSkills = ['HTML', 'CSS + Frameworks', 'Javascript(ES6)', 'jQuery', "REST API's", 'Node.js', 'Express', 'MySQL', 'Sequelize', 'MongoDB', 'Mongoose', 'React.js', 'MVC: EJS / Handlebars', 'Git / Command Line'];

    const designUL = document.getElementById('designSkills');
    const devUL = document.getElementById('devSkills');

    const runSkills = () => {
        for (let skill of designSkills) {
            const newLI = document.createElement('li');
            newLI.setAttribute('data-aos', 'fade-up')
            designUL.append(newLI)
            const newSkill = document.createElement('h3')
            newSkill.innerText = skill;
            newLI.append(newSkill)
        }

        for (let skill of devSkills) {
            const newLI = document.createElement('li');
            newLI.setAttribute('data-aos', 'fade-up')
            devUL.append(newLI)
            const newSkill = document.createElement('h3')
            newSkill.innerText = skill;
            newLI.append(newSkill)
        }
    }

    runSkills();


});