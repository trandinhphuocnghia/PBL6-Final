const mongoose = require('mongoose')


const productSchema = new mongoose.Schema({
    product_id:{
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    mainimg:{
        type: Object,
        default: false
    },
    title:{
        type: String,
        trim: true,
        required: true
    },
    price:{
        type: Number,
        trim: true,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    dimensions:{
        type: String,
        required: true
    },
    origin:{
    type:String,
    required: true
    },
    material:{
    type:String,
    required: true
    },
    age:{
    type:String,
    required: true
    },
    images:{
        type: Array,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    checked:{
        type: Boolean,
        default: false
    },
    sold:{
        type: Number,
        default: 0
    },
    shippingstatus:{
        type: String,
        default: 'Waiting'
    }
}, {
    timestamps: true //important
})


module.exports = mongoose.model("Products", productSchema)