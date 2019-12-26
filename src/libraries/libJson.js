const libFile = require('./libFile');

module.exports = {
    /**
     * Creates Json File.
     * @param {*} sPath 
     * @param {*} mData 
     */
    createJsonFile: function (sPath, mData) {
        if (typeof mData !== 'string') {
            mData = JSON.stringify(mData);
        }

        if (libFile.isFileExists(sPath)) {
            return {
                success: false
            }
        } else {
            libFile.createFile(sPath, mData);
            return {
                success: true
            }
        }
    },

    /**
     * Parse Json string
     * @param {*} sJson 
     */
    parseJson: function (sJson) {
        if (typeof sJson === 'string') {
            return {
                success: true,
                data: JSON.parse(sJson)
            };
        } else {
            return {
                success: false,
                message: 'Wrong format.'
            };
        }
    },

    /**
     * Stringify JSON
     * @param {*} mData 
     */
    stringifyJson: function (mData) {
        if (typeof mData === 'object' ||
            typeof mData === 'array') {
            return {
                success: true,
                data: JSON.stringify(mData)
            };
        } else {
            return {
                success: false,
                message: 'Wrong format.'
            };
        }
    }
};