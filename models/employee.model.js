// AUTOR: SÉRGIO DEIRÓ

const mongoose = require('mongoose');

var employeeSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: 'Campo Obrigátorio'
    },
    email: {
        type: String,
        required: 'Campo Obrigátorio'
    },
    mobile: {
        type: String,
        required: 'Campo Obrigátorio'
    },
    cpf: {
       type: String,
       required: 'Campo Obrigátorio'
    },
    rg: {
       type: String,
       required: 'Campo Obrigátorio' 
    },
    city: {
        type: String,
        required: 'Campo Obrigátorio',
    },
    states: {
        type: String,
        required: 'Campo Obrigátorio'
    },
    dateNasc: {
        type: String,
        required: 'Campo Obrigátorio'
    }
});

// Regex do Email
employeeSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'O Email é inválido.');

employeeSchema.path('cpf').validate((val) => {
    cpfRegex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
    return cpfRegex.test(val);
}, 'O Cpf é inválido');

mongoose.model('Employee', employeeSchema);