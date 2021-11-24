const mongoose = require('mongoose')


const paymentSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    paymentID:{
        type: String,
        required: true
    },
    address:{
        type: Object,
        required: true
    },
    cart:{
        type: Array,
        default: []
    },
    status:{
        type: Boolean,
        default: false
    },
    shipname:{
        type: String,
        required: true
    },
    shipaddress:{
        type: String,
        required: true
    },
    shipcity:{
        type: String,
        required: true
    },
    shipstate:{
        type: String,
        required: true
    },
    shipphone:{
        type: String,
        required: true
    },
    pay:{
        type:String,
        required: true
    },
    total:{
        type:String,
        required: true
    },
    time:{
        type:String,
        default: 'Waiting'
    },
    shippingstatus:{
        type: String,
        default: 'Waiting'
    }
}, {
    timestamps: true
})


module.exports = mongoose.model("Payments", paymentSchema)