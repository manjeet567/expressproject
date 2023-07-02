const Banner=require('../models/banner')
const Contact=require('../models/contact')

exports.adminbannershow=async(req,res)=>{
    const record=await Banner.findOne()
    res.render('admin/banner.ejs',{record})
}

exports.bannerupdate=async(req,res)=>{
    const id=req.params.id
    const record=await Banner.findById(id)
    res.render('admin/bannerform.ejs',{record})
}
exports.bannerrecord=async(req,res)=>{
    const{title,desc,ldesc}=req.body
    //console.log(req.body)
    //console.log(req.params.id)
    const id=req.params.id
    if(req.file){
        const filename=req.file.filename
        await Banner.findByIdAndUpdate(id,{title:title,desc:desc,ldesc:ldesc,img:filename})
    }else{
        await Banner.findByIdAndUpdate(id,{title:title,desc:desc,ldesc:ldesc})
    }
   res.redirect('/admin/banner')
}
exports.bannershow=async(req,res)=>{
    const footer=await Contact.findOne()
    const record=await Banner.findOne()
    res.render('banner.ejs',{record,footer})
}






//-----------------test url banner--------
exports.test2=(req,res)=>{
    const record=new Banner({title:'banner title'})
    record.save()
}