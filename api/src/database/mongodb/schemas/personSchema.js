const Mongoose = require('mongoose')

const personSchema = new Mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    idade: {
        type: Number,
        required: false,
    },
    telefone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    dataNascimento:{
        type: Date,
        required: false,
    },
    membro:{
        type: Boolean,
        required: true,
        defaut: 0
    },
    pago:{
        type: Boolean,
        required: false,
        default: false
    },
    compareceu:{
        type: Boolean,
        required: false,
        default: false
    },
    insertedAt: {
        type: Date,
        default: new Date()
    }

})
module.exports = Mongoose.model('Person', personSchema)