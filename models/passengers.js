const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const travel = require('./travel');

const passengerSchema = new mongoose.Schema({
    name: {
        type: String,
        // require: true
    },
    email: {
        type: String,
        // require: true
    },
    image:{
        type:String,
        require:true
    },
    phone_No: {
        type: Number,
        // require: true
    },
    password: {
        type: String,
        // require: true
    }
    // ticket:{
    //     type:ObjectId,
    //     require:true
    // }
})

const passengers = new mongoose.model("passengers", passengerSchema)
module.exports = passengers;