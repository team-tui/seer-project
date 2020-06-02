const { Schema } = require('mongoose')

const resultsSchema = new Schema(
    {
        state: {
            type: String,
            required: true
        }
    }
)

module.exports = resultsSchema