const fs = require('fs');

module.exports = {
    /**
     * Reads file from the path
     * @param {*} sPath 
     */
    readFile: function (sPath) {
        try {
            return {
                success: true,
                data: fs.readFileSync(sPath, 'utf-8')
            };
        } catch (err) {
            return {
                success: false,
                message: err
            };
        };
    },

    /**
     * Creates directory from path
     * @param {*} sPath 
     */
    createDirectory: function (sPath) {
        fs.mkdirSync(sPath);
        return {success: true};
    },

    /**
     * Checks if the file exists
     * @param {*} sPath 
     */
    isFileExists: function (sPath) {
        if (fs.existsSync(sPath)) {
            return true;
        }
    
        return false;
    },

    /**
     * Creates a file.
     * @param {*} sPath 
     * @param {*} sContents 
     */
    createFile: function (sPath, sContents='') {
        fs.writeFileSync(sPath, sContents);
        return {success: true};
    }
};