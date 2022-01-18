//which contains all configuration files.

const mongoose = require("mongoose")

//db connection
const db="mongodb://localhost:27017/neoSTORE";
const connectDB=async()=>{
    try{
      await mongoose.connect(db,{useNewUrlParser:true});
      console.log("MongoDb Connected");
    }
    catch(err){
      console.log(err.message);
    }
}

module.exports={connectDB}