const libFile = require('./libFile');
const constants = require('../constants');

module.exports = {
    /**
     * Gets file contents
     * @param {*} sProjectName 
     */
    getContents: function (sProjectName) {
        let oResoucePaths = constants.getResourcePaths();
        let oContents = JSON.parse(JSON.stringify(oResoucePaths));

        Object.keys(oResoucePaths).every(function (sKey) {
            let oResponse = libFile.readFile(oResoucePaths[sKey]);
            if (oResponse.success === false) {
                return false;
            }
            let sContents = oResponse.data;
            sContents = sContents.replace(/sap\.ui\.app\.test/gm, 'sap.ui.app.' + sProjectName);
            sContents = sContents.replace(/{"id" : "test"}/gm, '{"id" : "' + sProjectName + '"}');
            sContents = sContents.replace(/id : "test"/gm, 'id : "' + sProjectName + '"');
            oContents[sKey] = sContents;
            return true;
        });

        return oContents;
    }
};