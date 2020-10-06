// AUTOR: Mauricio Lanner

const mongoose = require('mongoose');

var addressSchema = new mongoose.Schema({
    type: {
        type: String,
        required: 'O campo tipo é obrigatório'
    },
    address: {
        type: String,
        required: 'O campo logradouro é obrigatório'
    },
    complement: {
        type: String,
    },
    number: {
       type: String,
       required: 'O campo numero é obrigatório'
    },
    district: {
       type: String,
       required: 'O campo bairro é obrigatório' 
    },
    city: {
        type: String,
        required: 'O campo cidade é obrigatório',
    },
    state: {
        type: String,
        required: 'O campo estado é obrigatório'
    },
    cep: {
        type: String,
        required: 'O campo CEP é obrigatório'
    }
});

mongoose.model('Address', addressSchema);