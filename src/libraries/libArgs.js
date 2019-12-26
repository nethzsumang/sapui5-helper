let aArgs = process.argv;

module.exports = {
    /**
     * Get arguments.
     * @param {*} iArgsLength 
     */
    getArguments: function (iArgsLength) {
        if (aArgs.length < iArgsLength) {
            return {
                success: false,
                message: 'Insufficient arguments.'
            };
        }

        return {
            success: true,
            data: aArgs
        };
    }
};