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