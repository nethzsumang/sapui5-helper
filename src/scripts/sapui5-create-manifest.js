#! /usr/bin/env node

// Require Statements
const constants = require('../constants');
const libJson = require('../libraries/libJson');
const libFile = require('../libraries/libFile');
const libInput = require('../libraries/libInput');
const libUtils = require('../libraries/libUtils');
const path = require('path');

/**
 * Creates manifest
 */
const createManifest = async function () {
    let sParentDir = process.cwd().split(path.sep).pop();
    let aQuestions = constants.getManifestQuestions(sParentDir);
    let aAnswers = await libInput.promptArray(aQuestions);
    aAnswers.desktopSupport = libUtils.convertAnswerToBool(aAnswers.desktopSupport);
    aAnswers.tabletSupport = libUtils.convertAnswerToBool(aAnswers.tabletSupport);
    aAnswers.phoneSupport = libUtils.convertAnswerToBool(aAnswers.phoneSupport);

    let oResponse = libFile.readFile(__dirname + '/../resources/manifest.json');
    if (oResponse.success === false) {
        console.log(oResponse.message);
        process.exit(1);
    }

    let sManifestTemplate = oResponse.data;
    oResponse = libJson.parseJson(sManifestTemplate);
    if (oResponse.success === false) {
        console.log(oResponse.message);
        process.exit(1);
    }

    let oManifestJson = oResponse.data;

    oManifestJson['sap.app']['id'] = aAnswers.id;
    oManifestJson['sap.app']['title'] = aAnswers.appTitle;
    oManifestJson['sap.app']['description'] = aAnswers.description;
    oManifestJson['sap.app']['applicationVersion']['version'] = aAnswers.appVersion;

    oManifestJson['sap.ui']['desktop'] = aAnswers.desktopSupport;
    oManifestJson['sap.ui']['phone'] = aAnswers.phoneSupport;
    oManifestJson['sap.ui']['tablet'] = aAnswers.tabletSupport;

    oManifestJson['sap.ui5']['rootView']['viewName'] = 'sap.ui.app.' + sParentDir + '.view.App';

    oResponse = libJson.stringifyJson(oManifestJson, 4);
    if (oResponse.success === false) {
        console.log(oResponse.message);
        process.exit(1);
    }
    libFile.overwriteFile(constants.cwd() + '/manifest.json', oResponse.data);
};

createManifest();