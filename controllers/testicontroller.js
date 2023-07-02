const Testi=require('../models/testinomial')
const Contact=require('../models/contact')



exports.testiformshow=async(req,res)=>{
    const footer=await Contact.findOne()
    res.render('testiform.ejs',{footer})
}
exports.testirecord=async(req,res)=>{
const filename=req.file.filename
const{tname,desc}=req.body
const record=await new Testi({name:tname,desc:desc,img:filename})
record.save()
res.redirect('/testi')
}
exports.testiselection=async(req,res)=>{
const totaltesti =await Testi.count()
const publish=await Testi.count({status:'publish'})
const unpublish=await Testi.count({status:'unpublish'})
//console.log(unpublish)
const record=await Testi.find().sort({posteddate:-1})    
res.render('admin/testi.ejs',{record,totaltesti,publish,unpublish})
}
exports.delete=async(req,res)=>{
const id=req.params.id
await Testi.findByIdAndDelete(id)
res.redirect('/admin/testi')
}

exports.testiupdate=async(req,res)=>{
const id=req.params.id
const record=await Testi.findById(id)
let newstatus=null
if(record.status=='unpublish'){
    newstatus='publish'
}else{
    newstatus='unpublish'
}
await Testi.findByIdAndUpdate(id,{status:newstatus})
res.redirect('/admin/testi')
}