#! /usr/bin/env node

const createManifest = async function () {
    const path = require('path');
    const input = require('./libs/input');
    const file = require('./libs/file');
    const contents = require('./libs/file_contents');
    let sProjectName = path.basename(process.cwd());

    const convertAnswerToBool = function (sAnswer) {
        if (['yes', 'y'].includes(sAnswer)) {
            return true;
        } else if (['no', 'n'].includes(sAnswer)) {
            return false;
        }
        return null;
    }

    let aQuestions = [
        {
            type: 'input',
            name: 'id',
            message: 'ID (default: ' + sProjectName + '): ',
            default: sProjectName
        },
        {
            type: 'input',
            name: 'appTitle',
            message: 'Application Title (default: ' + sProjectName + '): ',
            default: sProjectName
        },
        {
            type: 'input',
            name: 'description',
            message: 'Description (default: none): ',
            default: 'none'
        },
        {
            type: 'input',
            name: 'appVersion',
            message: 'Application Version (default: 1.0.0): ',
            default: '1.0.0',
            validate: function (sInput, oAnswers) {
                let oRegex = /^[0-9]+\.[0-9]+\.[0-9]+$/gm;
                // console.log(oRegex.test(sInput));
                return oRegex.test(sInput);
            }
        },
        {
            type: 'input',
            name: 'desktopSupport',
            message: 'Desktop Support (yes/no, default: yes): ',
            default: 'yes',
            validate: function (sInput) {
                sInput = sInput.toLowerCase();
                if (sInput !== 'yes' && sInput !== 'no' &&
                    sInput !== 'y' && sInput !== 'n') {
                        return false;
                    }
                return true;
            },
            filter: function (sInput) {
                return sInput.toLowerCase();
            }
        },
        {
            type: 'input',
            name: 'tabletSupport',
            message: 'Tablet Support (yes/no, default: yes): ',
            default: 'yes',
            validate: function (sInput) {
                sInput = sInput.toLowerCase();
                if (sInput !== 'yes' && sInput !== 'no' &&
                    sInput !== 'y' && sInput !== 'n') {
                        return false;
                    }
                return true;
            },
            filter: function (sInput) {
                return sInput.toLowerCase();
            }
        },
        {
            type: 'input',
            name: 'phoneSupport',
            message: 'Phone Support (yes/no, default: yes): ',
            default: 'yes',
            validate: function (sInput) {
                sInput = sInput.toLowerCase();
                if (sInput !== 'yes' && sInput !== 'no' &&
                    sInput !== 'y' && sInput !== 'n') {
                        return false;
                    }
                return true;
            },
            filter: function (sInput) {
                return sInput.toLowerCase();
            }
        }
    ];
    let answers = await input.promptArray(aQuestions);
    answers.desktopSupport = convertAnswerToBool(answers.desktopSupport);
    answers.tabletSupport = convertAnswerToBool(answers.tabletSupport);
    answers.phoneSupport = convertAnswerToBool(answers.phoneSupport);
    file.createFile(process.cwd() + '/manifest.json', contents.getManifestJsonContents(answers));
    console.log('Manifest file created.');
};

createManifest();
