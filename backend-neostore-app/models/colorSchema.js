const mongoose = require("mongoose")

const colorSchema = new mongoose.Schema({
    color_name:{
        type:String,
        required:true
    },
    color_code:{
        type:String,
        required:true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    }
})

module.exports = mongoose.model("colorData",colorSchema)