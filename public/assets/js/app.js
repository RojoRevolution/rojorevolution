document.addEventListener("DOMContentLoaded", () => {

    // DOM
    const AllPanelsEl = document.querySelector('.all-panels');
    const projectContentPanel = document.getElementById('project-wrapper');
    const homePageContentPanel = document.getElementById('home-content');
    const goBackButtonEl = document.querySelector('.go-back-container');
    const testButtonEl = document.getElementById('test-button');

    const projectContentToShow = document.querySelectorAll('.project-content');
    const allShowProjectButtons = document.querySelectorAll('[data-project-btn]');

    const projects = ['acopon', 'labels'];


    let currentScreenWidth;
    let contentPanelWidth;
    let dataProjectRender;
    let projectSectionWidth;
    let projectSectionPosition;

    // Function sets the width on both content panels
    setContentPanelWidths = () => {
        console.log("Content Width Function")
        contentPanelWidth = currentScreenWidth - 300;
        homePageContentPanel.style.maxWidth = contentPanelWidth + "px";
        projectContentPanel.style.right = "-" + contentPanelWidth + "px";
        projectContentPanel.style.maxWidth = contentPanelWidth + "px";
    }

    // Function gets the current window width and project panel status
    getProjectStatusAndWindowSize = () => {
        currentScreenWidth = document.body.clientWidth;
        setContentPanelWidths();
    }

    chooseProjectToDisplay = (dataProjectRender) => {
        switch (dataProjectRender) {
            case 'acopon':
                projectContentToShow[0].classList.toggle('col');
                break;
            case 'labels':
                projectContentToShow[1].classList.toggle('col');
                break;
            default:
                console.log('No project to view');
                break;
        }
    }

    // Opens the third panel that will show projects.
    showProjectPanel = (elem) => {
        console.log("Clicked")
        console.log(elem)
        // Set and Get Attributes
        let project = elem.getAttribute('data-project-btn');
        projectContentPanel.setAttribute('data-project-render', project)
        dataProjectRender = projectContentPanel.getAttribute('data-project-render');
        projectContentPanel.setAttribute('data-project-render', project);
        // Set Opacity
        homePageContentPanel.classList.toggle('opacity-75');
        projectContentPanel.classList.toggle('opacity-0');
        goBackButtonEl.classList.toggle('show-go-back');
        AllPanelsEl.style.left = "-" + contentPanelWidth + "px";
        chooseProjectToDisplay(dataProjectRender);
        // projectContentPanel.appendChild = projectsRenders[project]
    }

    hideProjectPanel = () => {
        console.log("Clicked")
        // projectContentToShow.classList..toggle('col');
        projectContentToShow.forEach(div => div.classList.remove('col'));
        projectStatus = projectContentPanel.setAttribute('data-project-render', '');
        projectContentPanel.classList.toggle('flex');
        homePageContentPanel.classList.toggle('opacity-75');
        projectContentPanel.classList.toggle('opacity-0');
        projectContentPanel.setAttribute('data-project-status', 'false');
        goBackButtonEl.classList.toggle('show-go-back');
        AllPanelsEl.style.left = 0 + "px";
    }



    // Get Window Size everytime the screen is resized
    window.addEventListener("resize", () => {
        getProjectStatusAndWindowSize();
        console.log("Width on resize: ", currentScreenWidth)

    });

    // Adds data values for buttons that open projects
    for (let i = 0; i < allShowProjectButtons.length; i++) {
        console.log("In Loop")
        allShowProjectButtons[i].setAttribute('data-project-btn', projects[i]);
    }

    // Run on Page Load
    getProjectStatusAndWindowSize();

    console.log("DOM loaded")
    console.log("Width on Load: ", currentScreenWidth)


});