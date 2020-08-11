const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");


// call the `render` function and pass in an array containing all employee objects
const render = require("./lib/htmlRenderer");

const teamMembers = []

// Create a HTML file for team members
function writeHtml() {
    const html = render(teamMembers);
    fs.writeFileSync("./output/team.html", html, "utf8");
}

// Prompt user for information
function promptUser() {
    inquirer.prompt([
        {
            type: 'list',
            message: 'choose an option for next team member',
            name: 'content',
            choices: ['Engineer', 'Intern', 'Done']
        }
    ]).then(function (answers) {
        if (answers.content === "Engineer") { promptEngineer() };
        if (answers.content === "Intern") { promptIntern() };
        if (answers.content === "Done") { writeHtml() };

    });

};


function promptEngineer() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: " Enter Engineer name?",
            validate: name => {
                if (name.length > 0)
                    return true
                else {
                    return false
                }

            }
        },
        {
            type: "input",
            name: "id",
            message: " Enter id of Engineer?"
        },

        {
            type: "input",
            name: "email",
            message: " Enter email of Engineer?",
            validate: emailInput => {
                return (/^.+@.+\..+$/gi.test(emailInput) ? true : `That's not an email!`)
            }
        },

        {
            type: "input",
            name: "github",
            message: " Enter github of Engineer?",
            validate: github => {
                if (github.length < 1) {
                    return "Username is too short.";
                }
                else if (github.toLowerCase() != github) {
                    return "Username should be lowercase.";
                }
                else {
                    // all validation checks passed
                    return true;
                }
            }
        },


    ]).then(function (answers) {
        // console.log(answers);
        let newEngineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
        teamMembers.push(newEngineer);
        console.log(teamMembers);
        promptUser();
    });
};

function promptIntern() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: " Enter Intern name?",
            validate: name => {
                if (name.length > 0)
                    return true
                else {
                    return false
                }
            }
        },

        {
            type: "input",
            name: "id",
            message: " Enter id of Intern?"
        },

        {
            type: "input",
            name: "email",
            message: " Enter email of Intern?",
            validate: emailInput => {
                return (/^.+@.+\..+$/gi.test(emailInput) ? true : `That's not an email!`)
            }
        },

        {
            type: "input",
            name: "school",
            message: " Enter school of Intern?",
            validate: school => {
                if (school.length > 0)
                    return true
                else {
                    return false
                }
            }
        },


    ]).then(function (answers) {
                // console.log(answers);
                let newIntern = new Intern(answers.name, answers.id, answers.email, answers.school);
                teamMembers.push(newIntern);
                console.log(teamMembers);
                promptUser();
            });
};


inquirer.prompt([
    {
        type: "input",
        name: "name",
        message: " Enter manager name?",
        validate: name => {
            if (name.length > 0)
                return true
            else {
                return false
            }
        }

    },

    {
        type: "input",
        name: "id",
        message: " Enter id of manager?"
    },

    {
        type: "input",
        name: "email",
        message: " Enter email of manager?",
        validate: emailInput => {
            return (/^.+@.+\..+$/gi.test(emailInput) ? true : `That's not an email!`)
        }
    },

    {
        type: "input",
        name: "officeNumber",
        message: " Enter office number of manger?",
        validate: officeNumber => {
            if (officeNumber.length > 0 && officeNumber.length < 15)
                return true
            else {
                return false
            }

        }
    },


]).then(function (answers) {
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
