const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/BillDB', {
    useNewUrlParser: true
}, (err) => {
    if (!err) {
        console.log('MongoDB Connection Successful.')
    } else {
        console.log('Error in DB connection:' + err)
    }
});

require('./bill.model');