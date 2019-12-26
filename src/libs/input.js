const inquirer = require('inquirer');

module.exports = {
    promptList: function (sMessage, aList, sName='untitled') {
        return inquirer.prompt([
            {
                type: 'list',
                name: sName,
                message: sMessage,
                choices: aList
            }
        ]);
    },
    promptArray: function (aList) {
        return inquirer.prompt(aList);
    }
}