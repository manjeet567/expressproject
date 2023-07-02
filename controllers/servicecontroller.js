const Service=require('../models/service')
const Contact=require('../models/contact')


exports.aadminserviceshow=async(req,res)=>{
const totalservices=await Service.count()
const publish=await Service.count({status:'publish'})
const unpublish=await Service.count({status:'unpublish'})
//console.log(unpublish)
const record=await Service.find().sort({postedDate:-1})
res.render('admin/service.ejs',{record,totalservices,publish,unpublish})
}
exports.serviceadd=(req,res)=>{
res.render('admin/serviceform.ejs')
}
exports.servicerecord=(req,res)=>{
const filename=req.file.filename
const{sname,desc,ldesc}=req.body
const record=new Service({name:sname,desc:desc,ldesc:ldesc,img:filename})
record.save()
res.redirect('/admin/Service')
}
exports.servicedelete=async(req,res)=>{
   const id=req.params.id
   await Service.findByIdAndDelete(id)
   res.redirect('/admin/Service')
}
exports.serviceupdate=async(req,res)=>{
const id=req.params.id
const record=await Service.findById(id)
//console.log(record.status)
let newstatus=null
if(record.status=='unpublish'){
newstatus='publish'
}else{
    newstatus='unpublish'
}
await Service.findByIdAndUpdate(id,{status:newstatus})
res.redirect('/admin/service')
}
exports.servicesinglerecord= async(req,res)=>{
const footer=await Contact.findOne()
const id=req.params.id
const record=   await Service.findById(id)
res.render('service.ejs',{record,footer})
}
exports.servicesearch=async(req,res)=>{
const{search}=req.body
const totalservices=await Service.count()
const publish=await Service.count({status:'publish'})
const unpublish=await Service.count({status:'unpublish'})
const record=await Service.find({status:search})
res.render('admin/service.ejs',{record,totalservices,publish,unpublish})
}