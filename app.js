const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamMembers = []

function writeHtml(){
const html = render(teamMembers);
fs.writeFileSync("./output/team.html",html,"utf8");
}

function promptUser(){
    inquirer.prompt([
{
    type: 'list',
        message: 'choose an option for next team member',
        name: 'content',
        choices: ['Engineer', 'Intern','Done']
}
    ]).then(function(answers){
        if(answers.content === "Engineer"){promptEngineer()};
        if(answers.content === "Intern"){promptIntern()};
        if(answers.content === "Done"){writeHtml()};    

    });

};


function promptEngineer(){
    inquirer.prompt([
        {
    type:"input",
    name:"name",
    message:" Enter Engineer name?"
    
        },
    
        {
            type:"input",
            name:"id",
            message:" Enter id of Engineer?"
        },
    
        {
            type:"input",
            name:"email",
            message:" Enter email of Engineer?"
        },
    
        {
            type:"input",
            name:"github",
            message:" Enter github of Engineer?"
        },
    
        
    ]).then(function(answers){
        // console.log(answers);
        let newEngineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
        teamMembers.push(newEngineer);
        console.log(teamMembers);
        promptUser();
    });
};

function promptIntern(){
    inquirer.prompt([
        {
    type:"input",
    name:"name",
    message:" Enter Intern name?"
    
        },
    
        {
            type:"input",
            name:"id",
            message:" Enter id of Intern?"
        },
    
        {
            type:"input",
            name:"email",
            message:" Enter email of Intern?"
        },
    
        {
            type:"input",
            name:"school",
            message:" Enter school of Intern?"
        },
    
        
    ]).then(function(answers){
        // console.log(answers);
        let newIntern = new Intern(answers.name, answers.id, answers.email, answers.school);
        teamMembers.push(newIntern);
        console.log(teamMembers);
        promptUser();
    });
};


inquirer.prompt([
    {
type:"input",
name:"name",
message:" Enter manger name?"

    },

    {
        type:"input",
        name:"id",
        message:" Enter id of manger?"
    },

    {
        type:"input",
        name:"email",
        message:" Enter email of manger?"
    },

    {
        type:"input",
        name:"officeNumber",
        message:" Enter office number of manger?"
    },

    
]).then(function(answers){
    // console.log(answers);
    let newManager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
    teamMembers.push(newManager);
    console.log(teamMembers);
    promptUser();
});



// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```