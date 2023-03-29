

//import mongoose

const mongoose=require("mongoose")


//connection string
mongoose.connect("mongodb://localhost:27017/bankServer",{useNewUrlParser:true})


//model
// schema means fields and value
const User=mongoose.model("User",
{
    username:String,
    acno:Number,
    password:String,
    balance:Number,
    transactios:[]
})


module.exports={
    User
}