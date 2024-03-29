const mongoose = require('mongoose')
const TransactionSchema = new mongoose.Schema({
    text: {
        type: String,
        trim: true,  // this is used to trim any white space
        required: [true, 'Please add some text']
    },
    amount: {
        type: Number,
        required: [true, 'Please add a positive or negative number']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Transaction', TransactionSchema)
// The first parameter is the name of the model and second is the schema for that model.