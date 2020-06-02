const { Schema } = require('mongoose')

const statusSchema = new Schema(
    {
        state: {
            type: String,
            enum: [
                'SUBMITTED',
                'MODERATED',
                'APPROVED',
                'REJECTED'
            ],
            default: 'SUBMITTED',
            required: [true, 'Gimmie dat status boi']
        },
        rejection_reason: {
            type: String,
            minlenght: 20
        }
    },
    { _id: false }
)

module.exports = statusSchema