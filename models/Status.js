const { Schema } = require('mongoose')

const statusSchema = new Schema(
    {
        state: {
            type: String,
            enum: [
                'SUBMITTED',
                'MODERATED',
                'ACCEPTED',
                'REJECTED'
            ],
            default: 'SUBMITTED',
            required: true
        },
        rejection_reason: {
            type: String,
        }
    },
    {_id: false }
)
module.exports = statusSchema