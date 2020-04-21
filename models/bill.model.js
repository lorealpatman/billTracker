const mongoose = require('mongoose');

var billSchema = new mongoose.Schema({
    billName: {
        type: String,
        required: 'This field is required'
    },
    number: {
        type: String
    },
    amount: {
        type: String,
        required: 'This field is required'
    },
    dueDate: {
        type: String
    },
    paid: {
        type: Boolean,
        default: false
    }
});

mongoose.model('Bill', billSchema);