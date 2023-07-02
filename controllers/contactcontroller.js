const Contact=require('../models/contact')


exports.showall=async(req,res)=>{
const record=await Contact.findOne()    
res.render('admin/contact.ejs',{record})    
}
exports.contactupdateform=async(req,res)=>{    
const id=req.params.id
const record=await Contact.findById(id)
res.render('admin/contactform.ejs',{record})
}
exports.contactupdate=async(req,res)=>{
const id=req.params.id
const{add,tel,mobile,email,insta,Twitter,linkdin,snap,cdetails}=req.body
await Contact.findByIdAndUpdate(id,{address:add,tel:tel,mobile:mobile,email:email,insta:insta,twitter:Twitter,linkdin:linkdin,snap:snap,cdetails:cdetails})
res.redirect('/admin/contact')
}