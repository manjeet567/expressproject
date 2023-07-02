const mongoose=require('mongoose')

const date=new Date()
const currentDate=date.getDate()
const month=date.getMonth()+1
const year=date.getFullYear()
const hours=date.getHours()
const minutes=date.getMinutes()
const seconds=date.getSeconds()
const realdate=(currentDate+"/"+month+'/'+year+' '+hours+':'+minutes+':'+seconds)
//console.log(realdate)


const testiSchema=mongoose.Schema({
   img:String,
   desc:String,
   name:String,
   status:{type:String,default:'unpublish'},
   posteddate:{type:String,default:realdate}
})






module.exports=mongoose.model('testinomial',testiSchema)