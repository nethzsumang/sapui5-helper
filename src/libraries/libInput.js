const inquirer = require('inquirer');

module.exports = {
    /**
     * Prompts list
     * @param {*} sMessage 
     * @param {*} aList 
     * @param {*} sName 
     */
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

    /**
     * Prompts array
     * @param {*} aList 
     */
    promptArray: function (aList) {
        return inquirer.prompt(aList);
    }
}