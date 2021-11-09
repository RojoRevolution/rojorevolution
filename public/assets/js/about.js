document.addEventListener("DOMContentLoaded", () => {

    const designSkills = ['Branding', 'Identity Design', 'Illustration', 'Visual Design', 'UI/UX Design', 'Web Design', 'Print Design', 'User Flows / Wireframes', 'Art Direciton', 'Storyboarding', 'User Research', 'Rapid Prototyping'
    ];

    const devSkills = ['HTML', 'CSS', 'Javascript(ES6)', 'jQuery', "REST API's", 'Node.js', 'Express', 'MySQL', 'Sequelize', 'MongoDB', 'Mongoose', 'React.js', 'MVC: EJS / Handlebars', 'Git / Command Line'];

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