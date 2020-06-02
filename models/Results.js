const mongoose = require('mongoose');
const { Schema } = require('mongoose')

const resultsSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        }
    }
)

module.exports = mongoose.model('Result', resultsSchema);