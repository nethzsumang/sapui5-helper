module.exports = {
    /**
     * Gets current working directory
     */
    cwd: function () {
        return process.cwd()
    },

    /**
     * Gets app dir
     * @param {*} sProjectName 
     */
    appDir: function (sProjectName) {
        return this.cwd() + '/' + sProjectName;
    },

    /**
     * Get SAPUI5 project paths
     */
    getPaths: function (sProjectName) {
        const sCwd = this.appDir(sProjectName);
        return {
            INDEX_HTML: sCwd + '/index.html',
            INDEX_JS: sCwd + '/index.js',
            VIEW_FOLDER: sCwd + '/view',
            APP_VIEW_XML: sCwd + '/view/App.view.xml',
            CONTROLLER_FOLDER: sCwd + '/controller',
            APP_CONTROLLER: sCwd + '/controller/App.controller.js',
            I18N_FOLDER: sCwd + '/i18n',
            I18N_PROPERTIES: sCwd + '/i18n/i18n.properties',
            I18N_EN_PROPERTIES: sCwd + '/i18n/i18n_en.properties',
            COMPONENT_JS: sCwd + '/Component.js'
        };
    },

    /**
     * Gets resource paths relative to
     * libraries folder.
     */
    getResourcePaths: function () {
        const sCwd = __dirname;
        return {
            INDEX_HTML: sCwd + '/resources/index.html',
            INDEX_JS: sCwd + '/resources/index.js',
            APP_VIEW_XML: sCwd + '/resources/App.view.xml',
            APP_CONTROLLER: sCwd + '/resources/App.controller.js',
            COMPONENT_JS: sCwd + '/resources/Component.js',
            APP_VIEW_JS: sCwd + '/resources/App.view.js'
        }
    },

    /**
     * Gets manifest questions
     */
    getManifestQuestions: function (sProjectName) {
        return [
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
    }
};