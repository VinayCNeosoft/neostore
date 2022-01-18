const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    product_name:{
        type:String,
        required:true
    },
    product_image:{
        type:[String],
    },
    product_desc:{
        type:String,
    },
    product_rating:{
        type:Number,
    },
    product_producer:{
        type:String,
    },
    product_cost:{
        type:Number,
    },
    product_stock:{
        type:Number,
    },
    product_dimension:{
        type:String
    },
    product_material:{
        type:String
    },
    color_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"colorData"
    },
    category_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"categorieData"
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model("productData",productSchema)