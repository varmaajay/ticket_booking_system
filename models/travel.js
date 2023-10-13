const mongoose = require('mongoose');
const { ObjectId } = require('mongoose/lib/schema');
const mixed= mongoose.Schema.Types.Mixed;




const travelSchema = new mongoose.Schema({
   passenger_ID: {
        type: mongoose.ObjectId,
        require: true
    },
   from: {
        type: String,
        require: true
    },
    To: {
        type: String,
        require: true
    },
    Ticket_time: {
        type: String,
        require: true
    },
    seat_No: {
        type: mixed,
        require: true
    },
    rupees: {
        type: Number,
        require: true
    },
    ticket_No: {
        type: Number,
        require: true
    },
    // ticket_time:{
    //      type: Number, 
    //      default: (new Date()).getTime() 
    // },
    Bus_No:{
        type:Number,
        require:true
    },
    start:{
        type:String,
        require:true
    },
    End:{
        type:String,
        require:true
    },
    delete:{
        type:Date,
        default:null
    }
    
})

const travel = new mongoose.model("travel", travelSchema);

module.exports = travel;