const fs = require('fs');

module.exports = {
    isFileExists: function (sPath) {
        if (fs.existsSync(sPath)) {
            return true;
        }
    
        return false;
    },
    createDirectory: function (sPath) {
        fs.mkdirSync(sPath);
    },
    createFile: function (sPath, sContents) {
        fs.writeFileSync(sPath, sContents);
    }
};