document.addEventListener("DOMContentLoaded", () => {

    // function findPos(obj) {
    //     var curtop = 0;
    //     if (obj.offsetParent) {
    //         do {
    //             curtop += obj.offsetTop;
    //         } while (obj = obj.offsetParent);
    //         return [curtop];
    //     }
    // }

    // if (window.location.href.indexOf("contact")) {
    //     window.scrollTo(0, findPos(contact));
    // };


    const designSkills = ['Branding', 'Identity Design', 'Art Direciton', 'Visual Design', 'UI/UX Design', 'Web Design', 'Print Design', 'User Flows / Wireframes', 'Storyboarding', 'User Research', 'Rapid Prototyping', 'Vector Illustration'
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