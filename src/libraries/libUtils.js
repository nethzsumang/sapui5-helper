module.exports = {
    /**
     * Converts answer to boolean type
     * @param {*} sAnswer 
     */
    convertAnswerToBool: function (sAnswer) {
        sAnswer = sAnswer.toLowerCase();
        if (['yes', 'y'].includes(sAnswer)) {
            return true;
        } else if (['no', 'n'].includes(sAnswer)) {
            return false;
        }
        return false;
    }
}