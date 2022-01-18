const mongoose = require("mongoose")

const categorieSchema = new mongoose.Schema({
    category_name:{
        type:String,
        required:true,
        unique:true
    },
    category_image:{
        type:String,
        required:true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    }
})

module.exports = mongoose.model("categorieData",categorieSchema)