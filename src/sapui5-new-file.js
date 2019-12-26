#! /usr/bin/env node
const file = require('./libs/file');
const contents = require('./libs/file_contents');

let aArguments = process.argv;

if (aArguments.length < 4) {
    console.log('Insufficient arguments.');
    process.process.exit(1);
}

let sCwd = process.cwd();

let sFileType = aArguments[2];
let sIndexHtmlPath = sCwd + '/index.html';

if (!file.isFileExists(sIndexHtmlPath)) {
    console.log('Not a valid SAPUI5 project.');
    process.process.exit(1);
}

if (sFileType === 'controller') {
    let sFilePath = sCwd + '/controller/' + aArguments[3];
    let sControllerFilePath = sFilePath + '.controller.js';
    if (file.isFileExists(sControllerFilePath)) {
        console.log('The file already exists.');
        process.exit(1);
    }

    file.createFile(sControllerFilePath, contents.getAppControllerJsContents());
    console.log('Controller successfully created.');
    process.exit(0);
}

if (sFileType === 'model') {
    let sFilePath = sCwd + '/model/' + aArguments[3];
    let sModelFilePath = sFilePath + '.json';
    if (file.isFileExists(sModelFilePath)) {
        console.log('The file already exists.');
        process.exit(1);
    }

    if (!file.isFileExists(sCwd + '/model')) {
        file.createDirectory(sCwd + '/model');
    }

    file.createFile(sModelFilePath, '{\n\n}');
    console.log('Model successfully created.');
    process.exit(0);
}

if (sFileType === 'view') {
    let sFilePath = sCwd + '/view/' + aArguments[3];
    const input = require('./libs/input');
    input.promptList('Select type of view: ', [
        'XML',
        'JS'
    ], 'viewType').then((answers) => {
        let sViewType = '';
        let sContents = '';
        if (answers.viewType === 'JS') {
            sViewType = 'js';
            sContents = contents.getAppViewJsContents();
        } else if (answers.viewType === 'XML') {
            sViewType = 'xml';
            sContents = contents.getAppViewXmlContents();
        }

        let sViewFilePath = sFilePath + '.view.' + sViewType;
        if (file.isFileExists(sViewFilePath)) {
            console.log('The file already exists.');
            process.exit(1);
        }
            
        file.createFile(sViewFilePath, sContents);
        console.log('View successfully created.');
        process.exit(0);
    });
}