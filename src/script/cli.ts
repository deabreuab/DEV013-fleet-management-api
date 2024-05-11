import inquirer from 'inquirer'

const answer = inquirer.prompt([
    {
        type: 'number',
        name: 'num2',
        message: 'Enter your last number',
    },
])

console.log(answer)
