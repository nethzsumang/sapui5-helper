const libFile = require('./file');

module.exports = {
    createJsonFile: function (sPath, sJson) {
        if (libFile.isFileExists(sPath)) {
            return {
                success: false
            }
        } else {
            libFile.createFile(sPath, sJson);
            return {
                success: true
            }
        }
    }
};