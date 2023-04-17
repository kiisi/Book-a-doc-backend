const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const hospitalSchema = new mongoose.Schema({
    name: String,
    state: String,
    city: String
}, { timestamps: true })


const hospitalModel = mongoose.model('hospital', hospitalSchema)

module.exports = hospitalModel