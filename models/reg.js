const mongoose=require('mongoose')


const regschema=mongoose.Schema({
    username:String,
    password:String
})





module.exports=mongoose.model('reg',regschema)