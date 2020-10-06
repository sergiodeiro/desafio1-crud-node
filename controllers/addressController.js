// AUTOR: MAURICIO LANNER
const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Address = mongoose.model('Address');

router.get('/', (req, res) => {
    res.render("address/addAddress", {
        viewTitle: "Inserir Endereço"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    console.log(req, res)
    var address = new Address();
    address.type = req.body.type;
    address.address = req.body.address;
    address.complement = req.body.complement;
    address.number = req.body.number;
    address.district = req.body.district;
    address.city = req.body.city;
    address.state = req.body.state;
    address.cep = req.body.cep;
    address.save((err, doc) => {
        if (!err)
            res.redirect('address/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                console.log('caiu no erro');
                res.render("address/addAddress", {
                    viewTitle: "Erro de preenchimento",
                    address: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Address.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('address/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("address/addAddress", {
                    viewTitle: 'Atualizar Endereço',
                    address: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    Address.find((err, docs) => {
        if (!err) {
            res.render("address/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving address list :' + err);
        }
    });
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'type':
                body['typeError'] = err.errors[field].message;
                break;
            case 'address':
                body['addressError'] = err.errors[field].message;
                break;
            case 'complement':
                body['complementError'] = err.errors[field].message;
            case 'number':
                body['numberError'] = err.errors[field].message;
            case 'district':
                body['districtError'] = err.errors[field].message;
            case 'city':
                body['cityError'] = err.errors[field].message;
            case 'state':
                body['stateError'] = err.errors[field].message;
            case 'cep':
                body['cepError'] = err.errors[field].message;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Address.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("address/addAddress", {
                viewTitle: "Atualizar Endereço",
                address: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Address.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/address/list');
        }
        else { console.log('Error in address delete :' + err); }
    });
});

module.exports = router;