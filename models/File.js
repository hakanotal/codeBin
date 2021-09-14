const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    codeFile: {
        type: String,
        required: true,
    },
    codeType: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('File', fileSchema);
