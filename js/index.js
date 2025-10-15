//get the body element
const body = document.body;

//----------------footer-------

//Create a footer element
let footer = document.createElement("footer");
//append the footer to the body;
body.appendChild(footer);

//create a new date object
const today = new Date();
//get the current year
const thisYear = today.getFullYear();
//get the current footer element
footer = document.querySelector("footer");
//create a new <p> element
const copyright = document.createElement("p");
//set the inner HTML with copyright symbol, your name and year
//<p>copyright Yen VO 2025
copyright.innerHTML = `\u00A9 Yen Vo ${thisYear}`;
//append <p> to the footer
footer.appendChild(copyright);
//center the footer 
footer.style.textAlign = "center";

//---------------Skills-------------//

//list your technical skills
let skills = ["JavaScript", "HTML", "CSS", "Git","Github"];

//select the skills section by id
const skillsSection = document.getElementById("Skills");
//sekect the empty <ul> inside the skills section 
const skillsList = skillsSection.querySelector("ul");

//Loop through the skills array
for(let i = 0; i <skills.length; i++){
    const skill = document.createElement("li"); //create a new <li> element
    skill.innerText = skills[i];//set the text of each li to the current skill
    skillsList.appendChild(skill);//append the <li> to the skills list
}

//---------------Message Form-------------//

//Helper function to hide message section if empty
function toggleMessagesSection(){
    const messagesSection = document.getElementById("Messages");
    const messageList = messagesSection.querySelector("ul");
    if(messageList.children.length === 0){
        messagesSection.style.display ="none";
    }else {
        messagesSection.style.display = "block";

    }
    }

//initially hide the message section because initial is p
toggleMessagesSection();

//Select the leave_message form by name
const messageForm = document.querySelector("form[name=leave_message]");

//add an event listener to handle "submit"
messageForm.addEventListener("submit",function(event){
    //prevent the page refresh
    event.preventDefault();
    
    //retrieve form value
    const userName = event.target.userName.value;
    const userEmail = event.target.userEmail.value;
    const userMessage = event.target.userMessage.value;
    //print values
    console.log("Name: ", userName);
    console.log("Email: ", userEmail);
    console.log("Message: ", userMessage);

    //selection the #Messages section
    const messagesSection = document.getElementById("Messages");

    //selection the <u> inside the #Messages section
    const messageList = messagesSection.querySelector("ul");

    //create a new list item
    const newMessage = document.createElement("li");

    //set the inner HTML
    newMessage.innerHTML =  `<a href="mailto:${userEmail}">${userName}:</a> <span>${userMessage}</span>`

    //edit button
    const editButton = document.createElement("button");
    editButton.innerText = "edit";
    editButton.className = "edit-btn";
    editButton.type = "button";

    //add click even listener to edit the message
    editButton.addEventListener("click",function(){
        //find message portion
        const messageSpan = newMessage.querySelector("span");
        //prompt the user for a new message
        const newText = prompt("Edit your Message: ", messageSpan.innerText);
        //update the message
        if(newText!==null){
            messageSpan.innerText = newText;
        }
        
    })

    //append edit button
    newMessage.appendChild(editButton);

    //remove button
    const removeButton = document.createElement("button");
    removeButton.innerText = "remove";
    removeButton.className = "remove-btn";
    removeButton.type = "button";

    //add click event listener to remove the message
    removeButton.addEventListener("click",function(){
        //find the <li>
        const entry = removeButton.parentNode;
        //remove it 
        entry.remove();
        //toggle with if there is no more messages
        toggleMessagesSection();
    });

    //append the remove button to the new message
    newMessage.appendChild(removeButton);

    //append the new message to the message list
    messageList.appendChild(newMessage);

    //Message section show up when there is note on message
    toggleMessagesSection();

    //clear form after submission
    messageForm.reset()
});

//---------------Lesson 13 Fetch API-----------//

fetch("https://api.github.com/users/Yenvo017/repos")
    .then((response) => {
        if (!response.ok) {
            throw new Error ("Failed to fetch data from Github. Please try again later");
        }
        return response.json();
    })
    .then((repositories)=>{
        // repositories = JSON.parse(this.repositories);
        console.log("Repositories:",repositories);
        //get the projects section
        const projectSection = document.getElementById("Projects");
        //select the list within the projects section
        const projectList = projectSection.querySelector("ul");
        //clear the content just in case
        projectList.innerHTML = "";

        for (let i = 0; i < repositories.length; i++){
             //create a new list item
            const project = document.createElement("li");
            //create a link for the list item
            const link = document.createElement("a");
            //set the link url
            //link.href = html_url = "https://github.com/Yenvo017/yen-vo-luna"
            link.href = repositories[i].html_url;   
            //set the text for the link
            link.textContent = repositories[i].name;
            if(!repositories[i].fork){
                //append the link to the list item
                project.appendChild(link);
                //append the list item to the list of projects
                projectList.appendChild(project);
            }      
        }

    })
    .catch((error) => {
        //log the error
        console.error("Error fetching repositories: ", error);
        //get the project section
        const projectSection = document.getElementById("Projects");
        //add an error message on the ui
        const errorMessage = document.createElement("p");
        errorMessage.innerHTML = 'Unable to load projects. Please try again later. ';
        projectSection.appendChild(errorMessage);
    });

