const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Bill = mongoose.model('Bill')


router.get('/', (req, res) => {
    res.render('bill/addOrEdit', {
        viewTitle: "Add Bill"
    })
});

router.post('/', (req, res) => {
    if (req.body._id == "")
        insertRecord(req, res);
    else
        updateRecord(req, res);

});

function insertRecord(req, res) {
    var bill = new Bill();
    bill.billName = req.body.billName;
    bill.number = req.body.number;
    bill.amount = req.body.amount;
    bill.dueDate = req.body.dueDate;
    bill.paid = Boolean(req.body.paid);
    bill.save((err, doc) => {
        if (!err)
            res.redirect('bill/list');
        else {
            if (err.name == 'Validation Error') {
                handleValidationError(err, req.body);
                res.render('bill/addOrEdit', {
                    viewTitle: "Add Bill",
                    bill: req.body
                });
            } else

                console.log('Error while inserting record: ' + err)
        }
    });
}

function updateRecord(req, res) {
    Bill.findOneAndUpdate({
        _id: req.body._id
    }, req.body, {
        new: true
    }, (err, doc) => {
        if (!err) {
            res.redirect('bill/list');
        } else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("bill/addOrEdit", {
                    viewTitle: "Edit Bill",
                    bill: doc
                });
            } else
                console.log('Error editing record: ' + err)
        }
    }, {
        useFindAndModify: false
    });
}

router.get('/list', (req, res) => {
    Bill.find((err, docs) => {
        if (!err) {
            res.render("bill/list", {
                list: docs
            });
        } else {
            console.log('Error finding bill list:' + err)
        }
    }).lean();
});

function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'billName':
                body['billNameError'] = err.errors[field].message;
                break;
            case 'amount':
                body['amountError'] = err.errors[field].message;
                break;
            default:
                break;



        }
    }
}

router.get('/:id', (req, res) => {
    Bill.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("bill/addOrEdit", {
                viewTitle: "Edit Bill",
                bill: doc
            });
        }
    }).lean();
});

router.get('/delete/:id', (req, res) => {
    Bill.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/bill/list');
        } else {
            console.log('Error deleting bill: ' + err);
        }
    }).lean();
});

module.exports = router;