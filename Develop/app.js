const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


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
const employees = [];
const managerQuestions = [
    // Employee - name, id, email
    // Manager - name, id, email, officeNumber
    // Intern - name, id, email, school
    // Engineer - name, id, email, github
    {
        type: "input",
        message: "What is your manager's name?",
        name: "managerName"
    },
    {
        type: "input",
        message: "What is your manager's id?",
        name: "managerId"
    },
    {
        type: "input",
        message: "What is your manager's email?",
        name: "managerEmail"
    },
    {
        type: "input",
        message: "What is your manager's office number?",
        name: "managerOfficeNumber"
    },
    {
        type: "list",
        message: "What type of team member would you like to add?",
        name: "teamChoice",
        choices: [
            'Engineer',
            'Intern',
            "I don't want to add any more team members"
        ]
    }
];

const engineerQuestions = [
    // Employee - name, id, email
    // Manager - name, id, email, officeNumber
    // Intern - name, id, email, school
    // Engineer - name, id, email, github
    {
        type: "input",
        message: "What is your engineer's name?",
        name: "engineerName"
    },
    {
        type: "input",
        message: "What is your engineer's id?",
        name: "engineerId"
    },
    {
        type: "input",
        message: "What is your engineer's email?",
        name: "engineerEmail"
    },
    {
        type: "input",
        message: "What is your engineer's github profile?",
        name: "github"
    },
    {
        type: "list",
        message: "What type of team member would you like to add?",
        name: "teamChoice",
        choices: [
            'Engineer',
            'Intern',
            "I don't want to add any more team members"
        ]
    }
];

const internQuestions = [
    // Employee - name, id, email
    // Manager - name, id, email, officeNumber
    // Intern - name, id, email, school
    // Engineer - name, id, email, github
    {
        type: "input",
        message: "What is your intern's name?",
        name: "internName"
    },
    {
        type: "input",
        message: "What is your intern's id?",
        name: "internId"
    },
    {
        type: "input",
        message: "What is your intern's email?",
        name: "internEmail"
    },
    {
        type: "input",
        message: "What is your intern's school?",
        name: "school"
    },
    {
        type: "list",
        message: "What type of team member would you like to add?",
        name: "teamChoice",
        choices: [
            'Engineer',
            'Intern',
            "I don't want to add any more team members"
        ]
    }
];

// function to initialize program
function manager() {
    // Create new manager object
    inquirer
    .prompt(managerQuestions)
    .then( response => { 
        const {managerName, managerId, managerEmail, managerOfficeNumber} = response;
        employees.push(new Manager(managerName, managerId, managerEmail, managerOfficeNumber));
        // Pass manager to htmlRenderer
        switch(response.teamChoice) {
            case 'Engineer':
              engineer();
              break;
            case 'Intern':
              intern();
              break;
            case "I don't want to add any more team members":
                finalize();
              break;
            default:
                break;
          }
    })
}

function engineer() {
    // Create new engineer employee object
    inquirer
    .prompt(engineerQuestions)
    .then( response => { 
        const {engineerName, engineerId, engineerEmail, github} = response;
        employees.push(new Engineer(engineerName, engineerId, engineerEmail, github));
        switch(response.teamChoice) {
            case 'Engineer':
              engineer();
              break;
            case 'Intern':
              intern();
              break;
            case "I don't want to add any more team members":
                finalize();
              break;
            default:
                break;
          }    })
}
function intern() {
    // Create new intern employee object
    inquirer
    .prompt(internQuestions)
    .then( response => { 
        const {internName, internId, internEmail, school} = response;
        employees.push(new Intern(internName, internId, internEmail, school));
        switch(response.teamChoice) {
            case 'Engineer':
              engineer();
              break;
            case 'Intern':
              intern();
              break;
            case "I don't want to add any more team members":
                finalize();
              break;
            default:
                break;
          }
    })
}

function finalize(){
    console.log(employees);
    const html = render(employees);
    fs.writeFile('output/team.html', html, function(err){
        if(err){
            console.log(err)
        }
    })
}
// function call to initialize program
manager();
