const Reg=require('../models/reg')
const bcrypt=require('bcrypt')

exports.adminloginshow=(req,res)=>{
    res.render('admin/login.ejs',{mess:''})
}

exports.admindashboard=(req,res)=>{
   // console.log(req.session)
    res.render('admin/dashboard.ejs')
}

exports.adimnlogout=(req,res)=>{
    req.session.destroy()
    res.redirect('/admin/')
}

exports.changepassshow=(req,res)=>{
res.render('admin/passchangeform.ejs',{mess:''})
}

exports.passchange=async(req,res)=>{
const{cpass,npass}=req.body
const record=await Reg.findOne()
const id=record.id
const pass=await bcrypt.compare(cpass,record.password)
if(pass){
    const convertpass=await bcrypt.hash(npass,10)
    await Reg.findByIdAndUpdate(id,{password:convertpass})
    req.session.destroy()
    res.render('admin/login.ejs',{mess:'Passowrd changed successfully please do fresh login'})
}else{
    res.render('admin/passchangeform.ejs',{mess:'Current password not match'})
}
}


//-------------dumy url-----------------

exports.test= async(req,res)=>{
    let pass='123'
    const cpass=await bcrypt.hash(pass,10)
    const record=new Reg({username:'admin',password:cpass})
    record.save()
}