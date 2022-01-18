//contains all api’s definition.
const userModel = require("../models/userSchema")
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const jwtSecret = "abcdefghijklmnopqrstuvwxyz"
const bcrypt = require("bcrypt");


const postdata=async (data)=>{
    let insert = await new userModel(data);
    insert.save((err)=>{
        if(err) throw err;
        else {
            console.log(data);
            return data;
            //   res.json({ err: 0, data: data });
        }
    })
}

module.exports = {postdata};