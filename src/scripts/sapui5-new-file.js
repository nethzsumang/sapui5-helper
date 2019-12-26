#! /usr/bin/env node

const libArgs = require('../libraries/libArgs');
const libFile = require('../libraries/libFile');
const libInput = require('../libraries/libInput');
const libContents = require('../libraries/libContents');
const constants = require('../constants');
const path = require('path');

let oResponse = libArgs.getArguments(4);
if (oResponse.success === false) {
    console.log(oResponse.message);
    process.exit(1);
}

let aArgs = oResponse.data;
let sCwd = constants.cwd();
let sFileType = aArgs[2];
let sFileName = aArgs[3];
let oContents = libContents.getContents(process.cwd().split(path.sep).pop());

if (libFile.isFileExists(sCwd + '/index.html') === false) {
    console.log('Not a valid SAPUI5 Application.');
    process.exit(1);
}

if (sFileType === 'controller') {
    let sPath = sCwd + path.sep + sFileType + path.sep + sFileName + '.controller.js';
    if (libFile.isFileExists(sPath) === true) {
        console.log('Controller already exists.');
        process.exit(1);
    }

    if (libFile.isFileExists(sCwd + path.sep + sFileType) === false) {
        libFile.createDirectory(sCwd + path.sep + sFileType);
    }

    libFile.createFile(sPath, oContents.APP_CONTROLLER);
    console.log('Controller successfully created.');
    process.exit(0);
}

if (sFileType === 'model') {
    let sPath = sCwd + path.sep + sFileType + path.sep + sFileName + '.json';
    if (libFile.isFileExists(sPath) === true) {
        console.log('Model already exists.');
        process.exit(1);
    }

    if (libFile.isFileExists(sCwd + path.sep + sFileType) === false) {
        libFile.createDirectory(sCwd + path.sep + sFileType);
    }

    let sContents = JSON.stringify({}, null, 4);
    libFile.createFile(sPath, sContents);
    console.log('Model successfully created.');
    process.exit(0);
}

if (sFileType === 'view') {
    let sPath = sCwd + path.sep + sFileType + path.sep + sFileName;
    libInput.promptList('Select type of view: ', [
        'XML',
        'JS'
    ], 'viewType').then((answers) => {
        let sViewType = '';
        let sContents = '';
        if (answers.viewType === 'JS') {
            sViewType = 'js';
            sContents = oContents.APP_VIEW_JS;
        } else if (answers.viewType === 'XML') {
            sViewType = 'xml';
            sContents = oContents.APP_VIEW_XML;
        }

        let sViewFilePath = sPath + '.view.' + sViewType;
        if (libFile.isFileExists(sViewFilePath)) {
            console.log('The file already exists.');
            process.exit(1);
        }

        libFile.createFile(sViewFilePath, sContents);
        console.log('View successfully created.');
        process.exit(0);
    });
}