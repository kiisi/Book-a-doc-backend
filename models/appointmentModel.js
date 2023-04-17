const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const appointmentSchema = new mongoose.Schema({
    hospital:{
        type: Schema.Types.ObjectId,
        ref: "hospital",
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    expires_at:{
        type: Date,
        required: true
    }
}, { timestamps: true })


const appointmentModel = mongoose.model('appointment', appointmentSchema)

module.exports = appointmentModel