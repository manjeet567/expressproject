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


const serviceSchema=mongoose.Schema({
    img:String,
    name:String,
    desc:String,
    ldesc:String,
    status:{type:String,default:'unpublish'},
    postedDate:{type:String,default:realdate}
})








module.exports=mongoose.model('service',serviceSchema)