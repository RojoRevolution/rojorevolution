document.addEventListener("DOMContentLoaded", () => {
    const servicesText = {
        illustration: "My bread and butter. Illustration work is my favorite type of work to do. I work exclusively in vector graphics, ensuring the final artwork is 100% scalable. I don't subscribe to a specific style; my illustrations can vary from simple to complex, depending on the project.",
        differentiation: "Also known as branding. Your branding should differentiate you from competitors and make you stand out in your market. Your brand will evolve over time, but its consistency should remain.",
        logos: "You have a story to tell. Logos help tell it. A logo isn't just for your main brand. Logos can also be used for your products. Giving each product under your main brand identity can help bolster impressions and recognizability and create loyalty.",
        web: "I like to know how things work, so I learned to code. While I'm technically a full-stack developer, I mostly stick to the front-end side of development. On the freelance end, I primarily help companies get their presence online.",
        print: "I started my career in print design, and contrary to popular belief, it's not dead. So whether you need color-separated artwork for screen printing, or are looking to create unique packaging for your products, I can definitely help with that."
    }

    const allTabElements = document.querySelectorAll('.tab');
    console.log(allTabElements)
    const contentArea = document.getElementById("services-content");
    let activeTab;
    let clickedTab;


    setTabContent = (activeTab) => {
        switch (activeTab) {
            case "1":
                contentArea.innerHTML = servicesText.illustration;
                break;
            case "2":
                contentArea.innerHTML = servicesText.differentiation;
                break;
            case "3":
                contentArea.innerHTML = servicesText.logos;
                break;
            case "4":
                contentArea.innerHTML = servicesText.web;
                break;
            case "5":
                contentArea.innerHTML = servicesText.print;
                break;
        }
    }


    allTabElements.forEach((tab) => {
        // Sets active tab on page load
        let currentStatus = tab.getAttribute("data-tab-status");
        if (currentStatus == "active") {
            activeTab = tab.getAttribute('data-tab-count');
            console.log("Active tab =", activeTab)
        }
        setTabContent(activeTab);
        // Event Listener when tabs are clicked
        tab.addEventListener("click", () => {
            clickedTab = tab.getAttribute("data-tab-count");
            for (let i = 0; i < allTabElements.length; i++) {
                allTabElements[i].setAttribute("data-tab-status", "inactive");
            }
            tab.setAttribute("data-tab-status", "active")
            setTabContent(clickedTab);
        })
    })

});