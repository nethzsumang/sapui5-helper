#! /usr/bin/env node

const libArgs = require('../libraries/libArgs');
const libFile = require('../libraries/libFile');
const libContents = require('../libraries/libContents');
const constants = require('../constants');

let mArgs = libArgs.getArguments(3);
if (mArgs.success === false) {
    console.log(mArgs.message);
    process.exit(1);
}

let aArgs = mArgs.data;
let sProjectPath = constants.cwd() + '/' + aArgs[2];

if (libFile.isFileExists(sProjectPath) === true) {
    console.log('Path is not available. Project cannot be created.');
    process.exit(1);
}

let oPaths = constants.getPaths(aArgs[2]);
let oContents = libContents.getContents(aArgs[2]);
let oResponse = null;

libFile.createDirectory(sProjectPath);
console.log('Project folder created.');

libFile.createFile(oPaths.INDEX_HTML, oContents.INDEX_HTML);
console.log('index.html file created.');

libFile.createFile(oPaths.INDEX_JS, oContents.INDEX_JS);
console.log('index.js file created.');

libFile.createFile(oPaths.COMPONENT_JS, oContents.COMPONENT_JS);
console.log('Component.js file created.');

libFile.createDirectory(oPaths.VIEW_FOLDER);
libFile.createFile(oPaths.APP_VIEW_XML, oContents.APP_VIEW_XML);
console.log('App.view.xml file created.');

libFile.createDirectory(oPaths.CONTROLLER_FOLDER);
libFile.createFile(oPaths.APP_CONTROLLER, oContents.APP_CONTROLLER);
console.log('App.controller.js file created.');

libFile.createDirectory(oPaths.I18N_FOLDER);
libFile.createFile(oPaths.I18N_PROPERTIES, '');
libFile.createFile(oPaths.I18N_EN_PROPERTIES, '');
console.log('i18n files created.');

console.log('Project files created.');

