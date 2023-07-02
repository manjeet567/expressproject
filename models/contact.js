const mongoose=require('mongoose')


const contactSchema=mongoose.Schema({
    address:String,
    tel:Number,
    mobile:Number,
    email:String,
    insta:String,
    twitter:String,
    linkdin:String,
    snap:String,
    cdetails:String
})




module.exports=mongoose.model('contact',contactSchema)